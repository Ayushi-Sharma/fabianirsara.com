<?php
namespace App; use App;

class Controller
{
  public $request;
  public $response;
  public $args;

  public function __construct($request, $response, $args = NULL)
  {
    $this->request = $request;
    $this->response = $response;
    $this->args = $args;
  }

  protected function param($key)
  {
    $value = '';

    if (isset($this->args[$key]))
    {
      $value = $this->args[$key];
    }
    else
    {
      $query = $this->request->getQueryParams();

      if (isset($query[$key]))
      {
        $value = $query[$key];
      }
    }

    return $value;
  }

  public function json($data)
  {
    $this->response = $this->response->withHeader('Content-type', 'application/json');
    return $this->output(json_encode($data));
  }

  public function output($data)
  {
    $this->response->write($data);
    return $this->response;
  }
}
