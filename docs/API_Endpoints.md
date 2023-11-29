# API Endpunkte

## Rezepte

Endpunkte im Zusammenhang mit dem Abrufen und Bearbeiten von Rezepten.

---

### Rezepte abrufen

Gibt für eine Liste aus Zutaten die passenden Rezepte entsprechend der Wichtung der Zutaten zurück.

**POST**

``
http://localhost:3010/recipes/get
``

#### Body

**JSON**

``
{
"ingredients": [<ingredient>]
}
``

z.B.:

``
{
"ingredients": [
"hackfleisch",
"käse"
]
}
``

#### Ergebnis

200 = Array aus Rezepten<br>
500 = Fehler mit dem Datenbankabruf, siehe Log

---

## User

Endpunkte im Zusammenhang mit dem Abrufen und Bearbeiten von Usern.

---

### User erstellen

Legt einen neuen User in der Datenbank an.

**POST**

``
http://localhost:3010/users/create
``

#### Body

**JSON**

``
{
"name": <user_name>,
"pass": <passwort>
}
``

z.B.:

``
{
"name": "testName",
"pass": "testPasswort"
}
``

#### Ergebnis

200 = User erfolgreich angelegt<br>
400 = User existiert bereits, kein neuer User angelegt<br>
500 = Interner Serverfehler, siehe Log

---

### User Authentifizierung

Prüft ob Name und Passwort mit einem Nutzer in der Datenbank übereinstimmen.

**POST**

``
http://localhost:3010/users/auth
``

#### Body

**JSON**

``
{
"name": <user_name>,
"pass": <passwort>
}
``

z.B.:

``
{
"name": "testName",
"pass": "testPasswort"
}
``

#### Ergebnis

200 = Erfolg, User erfolgreich authentifiziert<br>
401 = Kein Erfolg, Daten stimmen nicht überein<br>
500 = Interner Serverfehler, siehe Log

---

