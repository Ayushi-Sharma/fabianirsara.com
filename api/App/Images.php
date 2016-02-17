<?php
namespace App; use App;
use \Eventviva\ImageResize;

class Images extends Controller
{
  public function getAction()
  {
    $size = $this->param('size');
    $file = $this->param('file');
    $config = Config::get('sizes');

    $file = str_replace('___', '/', $file);

    if (strpos(realpath(DOC_ROOT.$file), DOC_ROOT.'storage') === false)
    {
      $this->output('');
    }

    if (isset($config->$size) === false)
    {
      $size = 'full';
    }

    $cacheFile = DOC_ROOT.Config::get('cache').'/'.str_replace('/', '_', $size.'/'.$file);

    if (file_exists(DOC_ROOT.$file))
    {
      if (file_exists($cacheFile) === false)
      {
        @mkdir(dirname($cacheFile), 0777, true);

        $image = new ImageResize(DOC_ROOT.$file);
        $image->quality_jpg = Config::get('quality_jpg');

        $sizeDefinition = $config->$size;

        if (isset($sizeDefinition->fit))
        {
          $image->resizeToBestFit($sizeDefinition->fit->width, $sizeDefinition->fit->height);
        }
        else if (isset($sizeDefinition->crop))
        {
          $image->crop($sizeDefinition->crop->width, $sizeDefinition->crop->height);
        }

        $image->save($cacheFile);
      }
    }

    if (file_exists($cacheFile))
    {
      $image = new ImageResize($cacheFile);
      $image->output();
      die;
    }

    return $this->output('');
  }
}
