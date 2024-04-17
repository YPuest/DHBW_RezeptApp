# Projektname
## Softwareanforderungen
> Bei dieser Vorlage handelt es sich um eine vereinfachte Version, die auf den Dokumentationsvorlagen von IBM Rational Unified Process (RUP) basiert.

## 1. Einleitung

### 1.1 Übersicht
> Was sind die Verkaufsargumente bzw. Alleinstellungsmerkmale Ihrer Softrware?

Unsere Rezeptapp verfügt über eine außergewöhnliche Funktion, welche unser Produkt über Konkurrenten stellt. Es können Zutaten, die unser Kunde bereits besitzt, eingegeben werden. Dadurch werden passende Rezepte angezeigt. Die fehlenden Zutaten werden in einer Einkaufsliste generiert.
Unsere Rezeptapp soll dadurch Lebensmittelverschwendung vorbeugen.

### 1.2 Geltungsbereich
> Was wird in diesem Dokument behandelt (nicht behandelt)? Ist es für Ihr gesamtes System oder ein Subsystem? Deckt es sowohl funktionale als auch nichtfunktionale Anforderungen ab? (Werden Sie einige Anforderungen in ein anderes Dokument auslagern?)

In dieser Software Requirements Specification (SRS) werden alle Dokumente für die Planung und Durchführung unserem Projekt "Rezeptapp" dargestellt. Es beinhaltet neben einer kurzen Beschreibung des Projekts, auch den aktuellen technischen Stand, sowie die Planung für weitere Funktionen, welche in zukunft implimentiert werden.
### 1.3 Definitionen, Akronyme und Abkürzungen
> Definitionen aller Begriffe, Akronyme und Abkürzungen, die für die ordnungsgemäße Interpretation dieses Dokuments erforderlich sind.

Noch keine Abkürzungen enthalten.
### 1.4 Referenzen
> Eine vollständige Liste aller referenzierten Dokumente. Jedes Dokument sollte anhand von Titel, Datum und Veröffentlichungsorganisation identifiziert werden. Sie können auch Hyperlinks einfügen, um die Referenzen bequem zu öffnen.

Rezeptapp-Blog:
https://github.com/JPawlowitz/DHBW_RezeptApp/discussions

GitHub-Code:
https://github.com/JPawlowitz/DHBW_RezeptApp
## 2. Funktionale Anforderungen
### 2.1 Übersicht

![](https://i.imgur.com/9tnwiQa.png)

Als User soll man die in der Rezept-App die folgenden Möglichkeiten haben.
### 2.2 User Stories
#### 2.2.1 Zutaten eingeben, Rezept erhalten
Als User möchte ich Zutaten eingeben können, um dazu passende Rezepte zu erhalten.
![|500](https://i.imgur.com/xoskyLv.png)

##### Aktivitätsdiagramm
![](https://i.imgur.com/BVaqaON.png)

#### 2.2.2 Rezept abrufen
Als User möchte ich ein Rezept wählen können, um dieses nach Rezept kochen zu können.
![|500](https://i.imgur.com/QiVUwjL.png)

#### 2.2.3 Rezepte merken
Als User möchte ich gefundene Rezepte speichern, um sie leichter wieder zu finden [[SoftwareAnforderungsspezifikation#2.2 Zutaten eingeben, Rezept erhalten|2.2]])

#### 2.2.4 Neue Rezepte speichern
Als User möchte ich eigene Rezepte hinzufügen, um das vorhandene Sortiment zu ergänzen.

![](https://i.imgur.com/veVPDn8.png)
##### Aktivitätsdiagramm
![](https://i.imgur.com/5MLmKK0.png)

#### 2.2.5 Rezept bearbeiten
Als User möchte ich bestehende Rezepte bearbeiten können. (UI siehe [[SoftwareAnforderungsspezifikation#2.3 Rezept abrufen|2.3]])
#### 2.2.6 User Account anlegen
Als User möchte ich einen Account anlegen können, um meine Inhalte zu personalisieren.
#### 2.2.7 User Account einloggen
Als User möchte ich mich in meinen vorhanden Account einloggen können, damit ich immer wieder auf meine personalisierten Daten zugreifen kann.
##### Aktivitätsdiagramm
![](https://i.imgur.com/i3XOuT8.png)

#### 2.2.8 User Account löschen
Als User möchte ich meinen Account löschen um meine Daten zu entfernen. (UI siehe [[SoftwareAnforderungsspezifikation#2.5 Neue Rezepte speichern|2.5]])
### 2.3 Komponenten
![](https://i.imgur.com/rAv9hPc.png)

Der RecipeContainer (Dashboard) bekommt vom Backend ein Array aus Recipes im JSON-Format und nutzt die Informationen aus diesem Dateninterface um eine Anzahl an RecipePreviews darzustellen. Durch Klick auf RecipePreview öffnet sich die RecipePage-Komponente, die genaue Informationen über Zutaten und Zubereitungsbeschreibung enthält (siehe [[SoftwareRequirementsSpecification#2.2.2 Rezept abrufen|Rezept abrufen - UI]]). Die nötigen Recipe-Daten werden durch den RecipeContainer weitergegeben.
## 3. Nichtfunktionale Anforderungen

> [WICHTIG:]
> Es ist nicht notwendig, alle der folgenden Kategorien abzudecken. Konzentrieren Sie sich auf das, was Sie in Ihrem Projekt umsetzten werden.
> Wenn einige nichtfunktionale Anforderungen als User Stories in Ihrem Backlog beschrieben werden, fügen Sie deren **Links** in diesem Abschnitt hinzu oder beliebige Informationen, die den Leser bei der Suche nach ihnen in Ihrem Backlog unterstützen, z.B. die **Bezeichnung** der relevanten User Story.

> Kategorien: Benutzerfreundlichkeit, Zuverlässigkeit, Leistung, Effizienz, Integrität, Wartbarkeit, Flexibilität, Testbarkeit, Wiederverwendbarkeit, Sicherheit.

### 3.1 Benutzerfreundlichkeit 

Wir möchten eine einfache und selbsterklärende Webapp gestalten. Die App soll nicht mit Informationen überladen werden. Die meisten Funktionen werden daher mit Piktogrammen gestaltet, um unnötigen Text zu vermeiden. Z. B. wird an jedes Rezept ein "Herz"-Button angeheftet, um so Rezepte zu speichern, um sie schneller wiederzufinden.
Die dazugehörigen User-Storys finden Sie hier:
https://github.com/YPuest/DHBW_RezeptApp/blob/master/docs/SoftwareRequirementsSpecification.md#22-user-stories

Die Rezepte werden nur mit einem Titelbild und der Überschrift angezeigt. Wenn mit der Maus darüber gehovert wird, öffnet sich eine Übersicht, über alle Zutaten. So kann man sich schnell einen Überblick über die noch fehlenden Zutaten zu verschaffen. Durch diese Funktion bleibt die Hauptseite einheitlich gestaltet und ist nicht überladen mit jeglichen Informationen zum Rezept. 
Die dazugehörige User-Storys finden Sie hier.
https://github.com/YPuest/DHBW_RezeptApp/blob/master/docs/SoftwareRequirementsSpecification.md#222-rezept-abrufen

### 3.2 Flexibilität

Um ein gutes Benutzererlebnis sicherzustellen, wird stark auf die Flexibilität unserer Rezeptapp geachtet. Die Kunden sollen Rezepte einfügen und jederzeit bearbeiten können. Daher muss unsere Software dementsprechend ausgelegt sein.  
User-Storys: https://github.com/YPuest/DHBW_RezeptApp/blob/master/docs/SoftwareRequirementsSpecification.md#223-rezepte-merken
## 4. Technische Einschränkungen
> Geben Sie alle wichtigen Einschränkungen, Annahmen oder Abhängigkeiten an, z. B. alle Einschränkungen darüber, welcher Servertyp verwendet werden soll, welche Art von Open-Source-Lizenz eingehalten werden muss usw.

Es können designtechnische Unterschiede entstehen für verschiedene Browser oder unterschiedliche Betriebssysteme, die wir nicht beeinflussen können.

Features müssen möglicherweise durch Sicherheitsanforderungen angepasst werden. Des Weiteren muss die Datenbank für die persönlichen Daten der Nutzer besondere Sicherheitsanforderungen erfüllen.

