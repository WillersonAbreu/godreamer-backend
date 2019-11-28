<?php

namespace App\Data;

use App\Types\TokenDecodedType;

class Tokens
{
  /** @var TokenDecodedType $tokenDecoded */
  public static $tokenDecoded;
  /** @var string $tokenEncoded */
  public static $tokenEncoded;
  /** @var string $refreshToken */
  public static $refreshToken;
}
