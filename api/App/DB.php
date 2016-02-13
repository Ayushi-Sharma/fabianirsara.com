<?php
namespace App; use App;

class DB
{
  private $data = NULL;
  private $oldData = NULL;
  private $client = NULL;
  private $dataPath = NULL;

  public function get()
  {
    if ($this->data && isset($this->data['data']))
    {
      return $this->data->data;
    }
  }

  public function sync()
  {
    $this->dataPath = DOC_ROOT.Config::get('storage').'/data.json';
    $shouldSync = true;

    if (file_exists($this->dataPath))
    {
      $this->data = json_decode(file_get_contents($this->dataPath));

      if (time() - $this->data->synched < Config::get('cache'))
      {
        $shouldSync = false;
      }
    }

    if ($shouldSync)
    {
      $this->oldData = $this->data;

      $this->data = array();
      $this->data['synched'] = time();
      $this->data['data'] = array();
      $this->data['files'] = array();

      $this->client = new \Dropbox\Client(Config::get('token'), 'DB/1.0');
      $this->_sync('/'.Config::get('db'));
      $this->_store();
    }
  }

  private function _sync($folder)
  {
    $localFolder = DOC_ROOT.strtolower(Config::get('storage').'/db'.$folder);
    $meta = $this->client->getMetadataWithChildren($folder);

    @mkdir($localFolder, 0777, true);

    foreach ($meta['contents'] as $item)
    {
      if ($item['is_dir'])
      {
        $this->_sync($item['path']);
      }
      else
      {
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
              $shouldDownload = true;
            }
          }
        }

        if ($shouldDownload)
        {
          $file = fopen($localPath, 'w+b');
          $this->client->getFile($item['path'], $file);
          fclose($file);
        }

        if (substr($item['path'], -3) === '.md')
        {
          $item['content'] = file_get_contents($localPath);
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
