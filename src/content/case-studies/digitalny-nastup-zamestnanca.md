---
# Source: doc/content/web-copy-sk.md, "Prípadové štúdie" 3
order: 3
title: Digitálny nástup nového zamestnanca v banke
challenge: >-
  pri nástupe nového zamestnanca bolo treba získať jeho osobné údaje (meno, adresa, rodinný stav,
  uplatnenie nezdaniteľnej časti základu dane a ďalšie), založiť ho v internom systéme SAP HANA
  a informovať personalistu. Ručné prepisovanie medzi formulármi a systémami je pomalé a náchylné na chyby.
solution: >-
  webová aplikácia, v ktorej nový zamestnanec sám vyplní svoje údaje. Systém ho potom automaticky založí
  v SAP HANA a vytvorí JIRA tiket pre HR personalistu so základnými údajmi o novom zamestnancovi, takže
  personalista hneď vie, že údaje sú vyplnené a zamestnanec je založený.
technologies:
  - Angular
  - JIRA
  - SAP HANA
  - jtoken
result: >-
  jeden súvislý proces namiesto troch ručných krokov. Údaje zadáva ten, kto ich pozná, do SAP sa dostanú
  bez prepisovania a HR má prehľad v nástroji, ktorý už používa.
---
