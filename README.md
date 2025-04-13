
# Projekt: Turista Vlogger

## Fejlesztői szerver

1. Telepíts NodeJS-t és Angular CLI-t (`npm i -g @angular/cli`) a gépre.

2. Tedd be az `environment.ts`-t az `src` mappába.

3. Nyiss terminált, esetleg fejlesztői környezetet a projekt gyökerében.

4. Telepítsd a csomagokat: `npm  i`

5. Indítsd el: `ng  serve`

6. Nyisd meg az oldalt: `http://localhost:4200`

Már működik a regisztráció és bejelentkezés. Egyik fiók e-mail címe: <testuser1@example.me>, jelszava: 123QWE#asd.

## Átalakítók (Pipe-ok)

- **formatViewCount**: Nézettség kiírása. (0, 1 vagy több)

## Direktívák

- **openProfileMenu**: Ha be vagy lépve, és ráviszed az egeret a profilképre, megnyílik a profil menü, és nyitva is marad, amíg az egér a menün van.

- **addView**: A minta videókon megnyomott "Watch Now" gomb hatására növelhető a nézettség szám (és tesztelhető a formatViewCount pipe).

## Szolgáltatók

- **authService**: Autentikációval kapcsolatos műveletek, lekérdezések.

- **tourVideoService**: Egyelőre minta adatokat szolgál, később Firestore lesz.

## Material elemek

- Töltőképernyő közepén spinner

- Drawer mobilnézetben

- Elválasztó a drawer linkek között

- Ikonok a navigációs sávon:

  - Ajánlólink mellett (középen utolsó)

  - Mobilnézet esetén a drawer kapcsoló

- Tooltip az említett ajánlólinken, ha ráviszed az egeret

- Gombok több helyen

- Input mezők Bejelentkezés és Regisztráció oldalon

- Kártyanézet a videóknak

- Videó címnél egy badge, ha 1 napnál újabb (a második elem mindig új lesz)

- Snackbar üzenetek

## Adatmodellek

- Felhasználó

- Nyaralás videó
