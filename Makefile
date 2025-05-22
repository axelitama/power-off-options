UUID = poweroffoptions@axel
ifeq ($(strip $(DESTDIR)),)
	INSTALLTYPE = local
	INSTALLBASE = $(HOME)/.local/share/gnome-shell/extensions
else
	INSTALLTYPE = system
	SHARE_PREFIX = $(DESTDIR)/usr/share
	INSTALLBASE = $(SHARE_PREFIX)/gnome-shell/extensions
endif
INSTALLNAME = poweroffoptions@axel

.PHONY: default
default: build

.PHONY: build

.PHONY: install
install: build
	rm -rf $(INSTALLBASE)/$(INSTALLNAME)
	mkdir -p $(INSTALLBASE)/$(INSTALLNAME)
	cp -r ./* $(INSTALLBASE)/$(INSTALLNAME)

.PHONY: uninstall
uninstall:
	rm -rf $(INSTALLBASE)/$(INSTALLNAME)

.PHONY: clean
