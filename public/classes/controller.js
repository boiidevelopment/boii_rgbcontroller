class Controller {
    constructor(has_xenons, neon_state, headlight_state) {
        this.has_xenons = has_xenons;
        this.neons_on = neon_state;
        this.headlights_on = headlight_state;
        this.light_type = 'neons';
        this.active_preset = null;
        $(document).ready(() => {
            $(document).keyup((e) => this.handle_exit(e));
            this.build();
            this.add_event_listeners();
        });
    }

    handle_exit(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    close() {
        $('#main_container').empty();
        $.post(`https://${GetParentResourceName()}/close_ui`, JSON.stringify({}));
    }

    build() {
        const content = `
            <div class="controller_container">
                <div class="control_buttons">
                    <h3 class="section_header">Toggle Lights:</h3>
                    <div style="display: flex; gap: 1vw;">
                        <button id="neons_toggle_button" class="toggle_button ${this.neons_on ? 'active' : ''}">NEONS</button>
                        ${this.has_xenons ? `<button id="headlights_toggle_button" class="toggle_button ${this.headlights_on ? 'active' : ''}">LIGHTS</button>` : ''}
                    </div>
                </div>
                <div class="control_options">
                    <h3 class="section_header">Change Colour:</h3>
                    <div style="display: flex; gap: 1vw;">
                        <button id="neons_button" class="light_type_button ${this.light_type === 'neons' ? 'active' : ''}">NEONS</button>
                        ${this.has_xenons ? `<button id="headlights_button" class="light_type_button ${this.light_type === 'headlights' ? 'active' : ''}">LIGHTS</button>` : ''}
                    </div>
                </div>
                <div class="colour_display">
                    <h3 class="section_header">Custom Colour:</h3>
                    <div class="colour_preview" id="colour_preview" style="background-color: rgb(222, 222, 255);"></div>
                </div>
                <div class="sliders_container">
                    <div class="slider_group">
                        <label for="red_slider">Red</label>
                        <input type="range" id="red_slider" min="0" max="255" value="222">
                        <span id="red_value">222</span>
                    </div>
                    <div class="slider_group">
                        <label for="green_slider">Green</label>
                        <input type="range" id="green_slider" min="0" max="255" value="222">
                        <span id="green_value">222</span>
                    </div>
                    <div class="slider_group">
                        <label for="blue_slider">Blue</label>
                        <input type="range" id="blue_slider" min="0" max="255" value="255">
                        <span id="blue_value">255</span>
                    </div>
                </div>
                <h3 class="section_header">Preset Colours:</h3>
                <div class="preset_colours">
                    <button class="preset_colour" data-r="222" data-g="222" data-b="255" style="background-color: rgb(222, 222, 255);"></button>
                    <button class="preset_colour" data-r="2" data-g="21" data-b="255" style="background-color: rgb(2, 21, 255);"></button>
                    <button class="preset_colour" data-r="3" data-g="83" data-b="255" style="background-color: rgb(3, 83, 255);"></button>
                    <button class="preset_colour" data-r="0" data-g="255" data-b="140" style="background-color: rgb(0, 255, 140);"></button>
                    <button class="preset_colour" data-r="94" data-g="255" data-b="1" style="background-color: rgb(94, 255, 1);"></button>
                    <button class="preset_colour" data-r="255" data-g="255" data-b="0" style="background-color: rgb(255, 255, 0);"></button>
                    <button class="preset_colour" data-r="255" data-g="150" data-b="0" style="background-color: rgb(255, 150, 0);"></button>
                    <button class="preset_colour" data-r="255" data-g="62" data-b="0" style="background-color: rgb(255, 62, 0);"></button>
                    <button class="preset_colour" data-r="255" data-g="1" data-b="1" style="background-color: rgb(255, 1, 1);"></button>
                    <button class="preset_colour" data-r="255" data-g="50" data-b="100" style="background-color: rgb(255, 50, 100);"></button>
                    <button class="preset_colour" data-r="255" data-g="5" data-b="190" style="background-color: rgb(255, 5, 190);"></button>
                    <button class="preset_colour" data-r="35" data-g="1" data-b="255" style="background-color: rgb(35, 1, 255);"></button>
                    <button class="preset_colour" data-r="15" data-g="3" data-b="255" style="background-color: rgb(15, 3, 255);"></button>
                    <button class="preset_colour" data-r="200" data-g="100" data-b="50" style="background-color: rgb(200, 100, 50);"></button>
                    <button class="preset_colour" data-r="150" data-g="50" data-b="250" style="background-color: rgb(150, 50, 250);"></button>
                    <button class="preset_colour" data-r="77" data-g="203" data-b="194" style="background-color: rgb(77, 203, 194);"></button>
                </div>
                <div class="controller_footer">
                    Press ESC to Close
                </div>
            </div>
        `;
        $('#main_container').append(content);
        $('#neons_toggle_button').css('background-color', this.neons_on ? 'var(--accent_colour)' : 'var(--tertiary_background)');
        $('#headlights_toggle_button').css('background-color', this.headlights_on ? 'var(--accent_colour)' : 'var(--tertiary_background)');
    }

    add_event_listeners() {
        const red_slider = $('#red_slider');
        const green_slider = $('#green_slider');
        const blue_slider = $('#blue_slider');
        const neons_toggle_button = $('#neons_toggle_button');
        const headlights_toggle_button = $('#headlights_toggle_button');
        const neons_button = $('#neons_button');
        const headlights_button = $('#headlights_button');
        const preset_buttons = $('.preset_colour');
        red_slider.on('input', () => this.update_colour_preview());
        green_slider.on('input', () => this.update_colour_preview());
        blue_slider.on('input', () => this.update_colour_preview());
        neons_toggle_button.on('click', () => this.toggle_lights('neons'));
        headlights_toggle_button.on('click', () => this.toggle_lights('headlights'));
        neons_button.on('click', () => this.set_light_type('neons'));
        headlights_button.on('click', () => this.set_light_type('headlights'));
        preset_buttons.on('click', (event) => this.apply_preset(event));
    }

    update_colour_preview() {
        const r = $('#red_slider').val();
        const g = $('#green_slider').val();
        const b = $('#blue_slider').val();
        $('#red_value').text(r);
        $('#green_value').text(g);
        $('#blue_value').text(b);
        const rgb_string = `rgb(${r}, ${g}, ${b})`;
        $('#colour_preview').css('background-color', rgb_string);
        this.clear_active_preset();
        $.post(`https://${GetParentResourceName()}/update_colour`, JSON.stringify({
            r: parseInt(r),
            g: parseInt(g),
            b: parseInt(b),
            type: this.light_type
        }));
    }
    
    toggle_lights(type) {
        if (type === "neons") {
            this.neons_on = !this.neons_on;
            $('#neons_toggle_button').css('background-color', this.neons_on ? 'var(--accent_colour)' : 'var(--tertiary_background)');
        } else if (type === "headlights") {
            this.headlights_on = !this.headlights_on;
            $('#headlights_toggle_button').css('background-color', this.headlights_on ? 'var(--accent_colour)' : 'var(--tertiary_background)');
        }
        $.post(`https://${GetParentResourceName()}/toggle_lights`, JSON.stringify({
            type: type,
            neon_state: this.neons_on,
            headlight_state: this.headlights_on
        }));
    }
    
    apply_preset(event) {
        const button = $(event.target);
        const r = button.data('r');
        const g = button.data('g');
        const b = button.data('b');
        $('#red_slider').val(r);
        $('#green_slider').val(g);
        $('#blue_slider').val(b);
        this.update_colour_preview();
        this.set_active_preset(button);
    }

    set_active_preset(button) {
        $('.preset_colour').removeClass('active');
        button.addClass('active');
        this.active_preset = button;
    }

    clear_active_preset() {
        if (this.active_preset) {
            this.active_preset.removeClass('active');
            this.active_preset = null;
        }
    }

    set_light_type(type) {
        this.light_type = type;
        $('#neons_button').toggleClass('active', type === 'neons');
        $('#headlights_button').toggleClass('active', type === 'headlights');
    }
}

// Uncomment line below and open index.html to view UI in web browser.
//const test_controller = new Controller(true, true, true);
