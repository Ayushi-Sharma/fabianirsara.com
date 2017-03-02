<?php
namespace App; use App;

class Data extends Controller
{
  public function getAction()
  {
    return $this->json(DB::instance()->get());
  }

  public function cacheAction()
  {
    $page = $_POST['page'];
    $html = $_POST['html'];

    $page = substr($page, 1);
    $page = 'page_'.str_replace('/', '___', $page);
    $pagePath = DOC_ROOT.Config::get('storage').'/pages/'.$page.'.html';
    @mkdir(DOC_ROOT.Config::get('storage').'/pages', 0777, true);

    if (file_exists(dirname(__FILE__).'/template.dist.php'))
    {
      $template_vars = array(
        'title' => $_POST['title'],
        'keywords' => $_POST['keywords'],
        'description' => $_POST['description'],
        'html' => $_POST['html'],
        'style' => $_POST['style'],
        'data' => DB::instance()->get(),
      );

      extract($template_vars);

      ob_start();
      include dirname(__FILE__).'/template.dist.php';
      $html = ob_get_contents();
      ob_end_clean();

      file_put_contents($pagePath, $html);
    }

    return $this->json(['success' => true, 'page' => $page]);
  }
}
