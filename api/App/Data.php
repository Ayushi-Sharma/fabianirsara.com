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

    $html = '<!doctype html><html>'.$html.'</html>';

    file_put_contents($pagePath, $html);

    return $this->json(['success' => true, 'page' => $page]);
  }
}
