(Softvision) Web Community Monthly Challenge #1: A Drogon's Quest
=================================================================
So, wut dis?
------------
Well, if you have to know... this is just _one_ (of hopefully many other) implementations
of the `Snake`-like game (remember the trusty ol' Armageddon-proofed Nokia 3310?) for the
Web Community's first ever Monthly Challenge (_\*loud cheers\*_ _\*crowd goes wild\*_)!

If you got here, but _still_ don't know wut dis... gah, alright, read on...

How does I run dis?
-------------------
tl; dr - `npm run build && npm start`

Sheesh, amigo! Y U no check out `package.json`? As with any other Node.JS package, it's gonna
tell you most (if not all) of what you need to know (at least the major stuff you'll need to
hit the ground running). Alright, so, typically, among a slew of other things, there's gonna
be a `scripts` section in that file that tells you what the package can do. Common scripts
include (but are not limited to):
  * `start` - boots up the ol' thing and gets it goin' (typically run as `npm run start` or
  just `npm start`, for short)
  * `test` - runs any tests that the package might have lying around (don't bother looking -
  this package has none at the time of writing...) (typically run as `npm run test` or plain
  `npm test`)
  * others - the sky's the limit - anything that the package creator(s) / maintainer(s) might
  dream up and consider useful would go here. (run these via `npm run <script-name>` - there
  is no short-hand available for custom scripts... AFAIK)

In our very particular case, we'll want to do two things: build the thing (`npm run build`),
then run the thing (`npm start`). There you go - that's all you need to know! Enjoy!

*P.S.:* Try _not_ to waste more than half a day attempting to beat the game...
*P.P.S.:* I'm not ashamed to admit that I already lost 3 nights' worth of good sleep over this...
and counting!

Controls
--------
OK, admittedly, this may be more or less confusing, as it's not explicitly stated anywhere
(well, anywhere in your face, except here and in the code, obviously)... So, here's the lowdown:
  * `W` goes up
  * `A` goes left
  * `S` goes down
  * `D` goes right (oh, the puns!)
  * `Space` starts / pauses the game

That's about all you'll need to know. Was it really that difficult to guess?...

Configuration
-------------
If you're in the mood for something much, _much_, **much** nicer that this very basic, very fugly
offering, make sure you check out the other commit (soon to be a tag) in this repository -
the setup is identical (see the [How does I run dis?] section above), but you'll get a much more
enjoyable experience out of it!

Oh, yeah, almost forgot! In case you want to play around with it, `game.js` imports a very basic
renderer for the stage from `very-basic-renderer.js` (mad naming skillz, huh?). You can easily swap
this for the one in `renderer.js` and that'll get you a bunch of other goodies as well... or, yeah,
just switch to the previous commit... sure, be lazy about it...

That's about it! Enjoy! Be advised - it _can_ become addictive! You have been warned. KTHXBAI!
