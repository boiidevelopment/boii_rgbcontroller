let controller = null;

const handlers = {
    open_controller: (data) => {
        controller = new Controller(data.has_xenons, data.neon_state, data.headlight_state);
    }
};

window.addEventListener('message', function (event) {
    const data = event.data;
    const handler = handlers[data.action];
    if (handler) {
        handler(data);
    }
});
