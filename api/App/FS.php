<?php
namespace App; use App;

class FS
{
  public static function rimraf($folder)
  {
    $tmp = @scandir($folder);

    if (is_array($tmp))
    {
      foreach ($tmp as $item)
      {
        if ($item === '.') continue;
        if ($item === '..') continue;

        if (is_dir($folder.'/'.$item))
        {
          self::rimraf($folder.'/'.$item);
        }
        else
        {
          @unlink($folder.'/'.$item);
        }
      }
    }

    @rmdir($folder);
  }


  public static function cleanup($folder)
  {
    $tmp = @scandir($folder);

    if (is_array($tmp))
    {
      foreach ($tmp as $item)
      {
        if ($item === '.') continue;
        if ($item === '..') continue;

        if (is_dir($folder.'/'.$item))
        {
          self::cleanup($folder.'/'.$item);
        }
      }
    }

    @rmdir($folder);
  }
}
