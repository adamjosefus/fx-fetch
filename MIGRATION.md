- TS7+
- EffectTS 4+
- FxFetch je nyní environment-specifický. `fx-fetch/bun` je pro Bun, atd.


## Url

- Přidán `Url.SearchParams` namespace, který obsahuje typy a funkce pro práci s URL search parametry. Dříve bylo internal.
  - `Url.SearchParams.SearchParams` - Immutabilní reprezentace URL search parametrů.
  - `Url.SearchParams.Input` - Typ pro vstupní data, která mohou být převedena na `Url.SearchParams.SearchParams`.
  - `Url.SearchParams.Value` - Typ pro hodnoty jednotlivých search parametrů.


- [ ] Přidat http metodu QUERY
- [ ] Přidat možnost mít jakoukoli metodu HTTP
- [ ] Zjednodušit error handling z fetch
- [ ] Použítí layerů  z EffectTS