# Power Off Options

Power Off Options ist eine **GNOME-Shell-Erweiterung**, die dem Ausschaltmenü zusätzliche Schaltflächen hinzufügt:

- **Bildschirm ausschalten** — Schaltet den Monitor bzw. Bildschirm sofort aus.
- **Hybrider Ruhezustand** — Versetzt das System in den Bereitschaftsmodus und speichert den Systemzustand zusätzlich auf der Festplatte (sicher bei Stromausfall).
- **Bereitschaft, dann Ruhezustand** — Versetzt das System in den Bereitschaftsmodus und wechselt nach einer gewissen Zeit automatisch in den Ruhezustand.
- **Ruhezustand** — Speichert den Systemzustand auf der Festplatte und schaltet den Computer aus (die Wiederaufnahme dauert länger als aus dem Bereitschaftsmodus).
- **Benutzerumgebung neu starten (Soft-Reboot)** — Startet nur die Benutzerumgebung neu, ohne das gesamte System neu zu starten.
- **Neustart ins BIOS** — Startet den Computer direkt in die BIOS- bzw. UEFI-Einstellungen.
- **Benutzerdefinierte Befehle** — Fügen Sie über das Einstellungsfenster eigene Befehle hinzu. Damit können Sie dem Ausschaltmenü beliebige Einträge mit auszuführenden Shell-Befehlen hinzufügen.

## Voraussetzungen

- GNOME Shell;
- die Funktion „Bildschirm ausschalten“ funktioniert nur unter X11; Wayland wird nicht unterstützt;
- die Optionen für Ruhezustand, hybriden Ruhezustand und Neustart verwenden die entsprechenden `systemctl`-Befehle. Diese müssen auf Ihrem System aktiviert und korrekt konfiguriert sein, damit sie funktionieren.

## Installation

Installieren Sie die Erweiterung über die GNOME-Extensions-Website:  
<https://extensions.gnome.org/extension/8189/power-off-options/>

Alternativ können Sie sie manuell installieren:

1. Laden Sie dieses Repository herunter oder klonen Sie es.
2. Wechseln Sie in das Verzeichnis der Erweiterung.
3. Führen Sie Folgendes aus:
   - `make`, um die Erweiterung zu installieren;
   - `make uninstall`, um die Erweiterung zu deinstallieren.
4. Starten Sie GNOME Shell neu, damit die Änderungen übernommen werden (melden Sie sich beispielsweise ab und wieder an).

## Einstellungen

Sie können jede Schaltfläche einzeln über das integrierte Einstellungsfenster aktivieren oder deaktivieren:

```bash
gnome-extensions prefs power-off-options@axelitama.github.io
```

Dasselbe Fenster ist auch über die Anwendung **GNOME Extensions** erreichbar.
