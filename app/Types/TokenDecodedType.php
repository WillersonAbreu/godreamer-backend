<?php

namespace App\Types;

final class TokenDecodedType
{
  /** @var int $sub User's id */
  public $sub;
  /** @var int $exp Expiration datetime */
  public $exp;
  /** @var string $name */
  public $name;
  /** @var string $email */
  public $email;
}
