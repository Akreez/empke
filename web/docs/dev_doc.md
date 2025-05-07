# Fejlesztői dokumentáció

## A fejleszréshez használt eszközök

Az alkalmazás egy Node.js projektként fejlesztett webes felület.

Fejlesztői szervernek a BrowserSync-et használtuk, a VSCode kódszerkesztő mellett.

## Könyvtárszerkezet

A webes könyvtáron belül az src tartalmazza a forráskódot, itt futtatható. Az alkalmazáshoz egyetlen HTML és egy JavaScript fájl tartozik. A style.css jelenleg nincs használatban.

## Stílus

A stílus meghatározásához Bootstrap 5.3.3 keretrendszert használunk.

Párbeszédablakként a Bootstrap beépített modális ablakát használjuk. Ugyanezt az ablakot használjuk hozzáadáshoz és szerkesztéshez is.

## JavaScript

A weblap egyes részeit id segítségével kötjük az app.js fájlban egy változóhoz.

Az url változó tartalmazza a Backend elérési útját. Az addMode változó egy logikai változó. Hozzáadás esetén true, szerkesztés esetén false.

Két esemyénykezelőt használunk. Az egyik a hozzáadás gombra indul el, a másik a modális ablak mentés gombjára kattintva. 

### A getEmployee függvény

Lekéri a dolgozókat a Backend-től és elindítja a renderelést.

### A renderTbody függvény

A renderTbody függvény jeleníti meg a dolgozókat a webes felületen. A megjelenítéshez table elemet használunk.

A renderTbody paraméterként fogadja a megjelenítendő listát:

```javascript
renderTbody(empList)
```

### A clearFields függvény

A clearFields függvény törli a modális ablak bevitelimezőit.

```javascript
clearFields()
```

### A addEmployee függvény

Az addEmployee függvény a Backend számára elküldi az új dolgozó adatait POST metódussal. A dolgozó adatait paraméterként fogadja.

```javascript
addEmployee(emp)
```

### A deleteEmployee függvény

A delete employee függvény DELETE metódussal elküldi a törlendő dolgozó azonosítóját. Az id az URL-ben kerül átküldésre, például:

```url
/api/employees/3
```

A deleteEmployee függvény paraméterként várja a törlendő dolgozó azonosítóját:

```javascript
deleteEmployee(id)
```

### Az editEmployee függvény

Az editEmployee függvény beállítja a modális ablak tartalmát szerkesztéshez.

```javascript
editEmployee()
```

### Az updateEmployee függvény

Az updateEmployee függvény elküldi a Backend szervernek a módosítást, PUT metódussal. A módosítandó dolgozó azonosítóját az URL-ben küldjük, például:

```url
/api/employees/45
```

Az updateEmployee fügvény paraméterként várja a dolgozó módosított adatait:

```javascript
updateEmployee(emp)
```