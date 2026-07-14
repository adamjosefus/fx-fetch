- TS7+
- EffectTS 4+
- FxFetch je nyní environment-specifický. `fx-fetch/bun` je pro Bun, atd.


## Url

- Přidán `Url.SearchParams` namespace, který obsahuje typy a funkce pro práci s URL search parametry. Dříve bylo internal.
  - `Url.SearchParams.SearchParams` - Immutabilní reprezentace URL search parametrů.
  - `Url.SearchParams.Input` - Typ pro vstupní data, která mohou být převedena na `Url.SearchParams.SearchParams`.
  - `Url.SearchParams.Value` - Typ pro hodnoty jednotlivých search parametrů.
  - `Url.SearchParams.Input` -  příjímá nově `Iterable<readonly [string, Value]>` a `MapIterator<readonly [string, Value]>`
  - `Url.Input['searchParams']` -  příjímá nově `Iterable<readonly [string, Value]>` a `MapIterator<readonly [string, Value]>`


## Request

- `Request` je nyní v **core** a je **environment-agnostic** (bez DOM typů). Ve verzi 1 se používaly DOM globály (`Blob`, `AbortSignal`, native `Request`, `HeadersInit`…) přes `localThis`.
- Zatím obsahuje jen **vstupní typy, hlavní typ a `make`** (žádné operátory / fetch / format).
- **Bez polí `body` a `signals`** — jsou to skutečné DOM/runtime objekty a přijdou až v environment-specifické vrstvě.
- **fetch metadata** (`cache`, `credentials`, `mode`, `priority`, `redirect`, `referrerPolicy`) jsou v core lokální **string-union literály**, ne DOM typy. `referrerPolicy: ''` se normalizuje na `'no-referrer'`.
- Přidán `Request.Headers` namespace (analogie k `Url.SearchParams`), který obsahuje typy a funkce pro práci s hlavičkami.
  - `Request.Headers.Headers` - Immutabilní reprezentace hlaviček (`ReadonlyMap<string, readonly string[]>`, klíče lowercase).
  - `Request.Headers.Input` - Vstupní data: `Record`, pole dvojic `[key, value]`, `ReadonlyMap` nebo `Iterable`. Hodnota může být `string`, `readonly string[]`, `null` nebo `undefined` (blank hodnoty se přeskočí).
  - `Request.Headers.Value` - Typ pro hodnotu jednotlivé hlavičky.
- `Request.Input` přijímá `Request | Parts | Options | string` (string = url). Native `globalThis.Request` a `HeadersInit` se v core nepřijímají (přijdou v env vrstvě, stejně jako native `URL` u `Url`).
- `make` / `unsafeMake` mají stejný vzor jako `Url` (`make = Option.liftThrowable(unsafeMake)`).

- [x] Přidat http metodu QUERY
  - `Request.Method` nově obsahuje `QUERY`.
- [x] Přidat možnost mít jakoukoli metodu HTTP
  - `Request.Method = KnownMethod | (string & Record<never, never>)` — union známých metod kvůli DX (autocomplete), ale povolí i libovolnou custom metodu. `Request` metodu jen normalizuje (trim + uppercase, default `GET`), neodmítá ji.
- [ ] Zjednodušit error handling z fetch
- [ ] Použítí layerů  z EffectTS