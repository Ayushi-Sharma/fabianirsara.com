<?php
namespace App; use App;

class Data extends Controller
{
  public function getAction()
  {
    return $this->json(DB::instance()->get());
  }
}
