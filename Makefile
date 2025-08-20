EXTENSION_NAME=power-off-options@axelitama.github.io
EXTENSION_DIR=$(HOME)/.local/share/gnome-shell/extensions/$(EXTENSION_NAME)
SRC_DIR=$(PWD)/$(EXTENSION_NAME)
ZIP_NAME=$(EXTENSION_NAME).zip

.PHONY: build clean install uninstall zip

install: uninstall build
	@echo "Installing extension to $(EXTENSION_DIR)..."
	cp -r "$(SRC_DIR)" "$(EXTENSION_DIR)"

uninstall:
	@echo "Uninstalling extension from $(EXTENSION_DIR)..."
	rm -rf "$(EXTENSION_DIR)"

build: clean
	@echo "Compiling schemas..."
	glib-compile-schemas $(SRC_DIR)/schemas/

clean:
	@echo "Removing compiled schemas..."
	rm -f $(SRC_DIR)/schemas/gschemas.compiled

zip: clean
	@echo "Creating zip archive $(ZIP_NAME)..."
	rm -f "$(ZIP_NAME)"
	cd $(SRC_DIR) && zip -r "../$(ZIP_NAME)" "." -x '*.zip' '*.swp' '*~' '#*#' '.*'
