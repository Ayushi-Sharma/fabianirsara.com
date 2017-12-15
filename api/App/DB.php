<?php
namespace App; use App;

class DB
{
  private $data = NULL;
  private $oldData = NULL;
  private $client = NULL;
  private $dataPath = NULL;

  private static $instance;

  public function __construct()
  {
    self::$instance = $this;
    $this->dataPath = DOC_ROOT.Config::get('storage').'/data.json';

    if (file_exists($this->dataPath))
    {
      $this->data = json_decode(file_get_contents($this->dataPath));
    }
  }

  public static function instance()
  {
    return self::$instance;
  }

  public function get()
  {
    if ($this->data && isset($this->data->data))
    {
      $filePrefix = '/'.strtolower(Config::get('db')).'/';

      $data = $this->data->data;
      $data->files = array();

      foreach ($this->data->files as $key => $file)
      {
        $key = str_replace($filePrefix, '', $key);
        $data->files[$key] = $file;
      }

      return $data;
    }

    return NULL;
  }

  public function sync($force = false)
  {
    $shouldSync = true;

    if ($this->data && isset($this->data->data) && (time() - $this->data->synched < Config::get('cache_time')))
    {
      $shouldSync = false;
    }

    if ($shouldSync || $force)
    {
      $this->oldData = $this->data;

      $this->data = array();
      $this->data['synched'] = time();
      $this->data['data'] = array();
      $this->data['files'] = array();

      $dropboxService = new \Kunnu\Dropbox\DropboxApp(Config::get('key'), Config::get('secret'), Config::get('token'));
      $this->client = new \Kunnu\Dropbox\Dropbox($dropboxService);
      $this->_sync('/'.Config::get('db'));
      $this->_store();
    }
  }

  private function _sync($folder)
  {
    $localFolder = DOC_ROOT.strtolower(Config::get('storage').'/db'.$folder);
    $folderItems = $this->client->listFolder($folder)->getItems()->all();

    @mkdir($localFolder, 0777, true);

    foreach ($folderItems as $dropboxItem)
    {
      $item = $this->client->getMetadata($dropboxItem->getPathDisplay())->getData();

      if ($item['.tag'] === 'folder')
      {
        $this->_sync($dropboxItem->getPathDisplay());
      }
      else
      {
        $item['path'] = $item['path_lower'];
        $item['modified'] = $item['server_modified'];
        $item['lpath'] = strtolower($item['path']);

        $localPath = DOC_ROOT.strtolower(Config::get('storage').'/db'.$item['path']);
        $item['localFile'] = strtolower(Config::get('storage').'/db'.$item['path']);

        $shouldDownload = true;

        if (file_exists($localPath))
        {
          $shouldDownload = false;

          if ($this->oldData && isset($this->oldData->files) && isset($this->oldData->files->$item['lpath']))
          {
            if ($this->oldData->files->$item['lpath']->modified !== $item['modified'])
            {
              @unlink($localPath);
              @unlink(DOC_ROOT.Config::get('cache').'/full_'.strtolower(str_replace('/', '_', $item['localFile'])));
              @unlink(DOC_ROOT.Config::get('cache').'/large_'.strtolower(str_replace('/', '_', $item['localFile'])));
              @unlink(DOC_ROOT.Config::get('cache').'/page_'.strtolower(str_replace('/', '_', $item['localFile'])));
              @unlink(DOC_ROOT.Config::get('cache').'/medium_'.strtolower(str_replace('/', '_', $item['localFile'])));
              @unlink(DOC_ROOT.Config::get('cache').'/small_'.strtolower(str_replace('/', '_', $item['localFile'])));
              @unlink(DOC_ROOT.Config::get('cache').'/preview_'.strtolower(str_replace('/', '_', $item['localFile'])));
              $shouldDownload = true;
            }
          }
        }

        if (substr($item['path'], -3) === '.md' || substr($item['path'], -5) === '.yaml' || substr($item['path'], -5) === '.json' || substr($item['path'], -4) === '.txt')
        {
          $shouldDownload = true;
        }

        if ($shouldDownload)
        {
          $this->client->download($item['path'], $localPath);
        }

        if (substr($item['path'], -3) === '.md' || substr($item['path'], -5) === '.yaml' || substr($item['path'], -5) === '.json' || substr($item['path'], -4) === '.txt')
        {
          $item['content'] = file_get_contents($localPath);
        }

        if (substr($item['path'], -4) === '.jpg' || substr($item['path'], -5) === '.jpeg' || substr($item['path'], -4) === '.png' || substr($item['path'], -4) === '.gif')
        {
          $size = @getimagesize($localPath);
          $item['width'] = @$size[0];
          $item['height'] = @$size[1];
        }

        $route = explode('/', str_replace('/'.strtolower(Config::get('db')).'/', '', $item['lpath']));

        $this->data['files'][$item['lpath']] = $item;
        $dataObj = &$this->data['data'];

        foreach ($route as $part)
        {
          if (isset($dataObj[$part]) === false)
          {
            $dataObj[$part] = array();
          }

          $dataObj = &$dataObj[$part];
        }

        $dataObj = $item;
      }
    }
  }

  private function _store()
  {
    if ($this->oldData && isset($this->oldData->files))
    {
      foreach ($this->oldData->files as $file)
      {
        $shouldRemove = true;

        if (isset($file->lpath) && isset($this->data['files'][$file->lpath]))
        {
          $shouldRemove = false;
        }

        if ($shouldRemove)
        {
          @unlink(DOC_ROOT.$file->localFile);
        }
      }
    }

    FS::cleanup(DOC_ROOT.Config::get('storage'));

    file_put_contents($this->dataPath, json_encode($this->data, JSON_PRETTY_PRINT));
    $this->data = json_decode(file_get_contents($this->dataPath));
  }
}
