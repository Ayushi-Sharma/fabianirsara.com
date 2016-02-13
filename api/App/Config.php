<?php
namespace App; use App;

class Config
{
  private static $data = NULL;

  public static function get($key, $default = NULL)
  {
    if (self::$data === NULL)
    {
      self::$data = json_decode(file_get_contents(DOC_ROOT.'config.json'));
    }

    if (isset(self::$data->$key))
    {
      return self::$data->$key;
    }

    return $default;
  }
}
