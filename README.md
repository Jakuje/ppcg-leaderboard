# ppcg-leaderboard

**NOTE: The site, Code Golf Stack Exchange, is no longer referred to as "PPCG". I will not change the name of the repository because the URL of the tool would change, which would break a lot of links.**

This tool allows you to embed a leaderboard on any `code-golf` challenge on Code Golf Stack Exchange: https://codegolf.stackexchange.com/. See https://xmikee1.github.io/ppcg-leaderboard/implement for information about how to implement a leaderboard into your post. [See the announcement](https://codegolf.meta.stackexchange.com/questions/17600/introducing-the-new-ppcg-leaderboard-widget).

***

# Features of the tool

* A sleek and modern feel, with Segoe UI font for easy reading.

* Responsive CSS to account for any browser width.

* Fully linked leaderboard for easy access to the author's profile and the answer.

* A multi-regex parser to cover many different title cases, instead of one large regex, which could have limitations.

* A valid Stack App ID to allow for a higher rate limit for the Stack Exchange API. This is important because especially on popular questions, leaderboards would "expire" because of the rate limit for the API being reached. This is no longer the case.

* Optimized JS code for fast leaderboard load time.

See [the original announcement](https://codegolf.meta.stackexchange.com/questions/17600/introducing-the-new-ppcg-leaderboard-widget) for more information about the tool. Pull requests are welcome and encouraged.

# Credit

This whole program was written by @xMikee1, with inspiration taken from Martin Ender's previous leaderboard snippet.
