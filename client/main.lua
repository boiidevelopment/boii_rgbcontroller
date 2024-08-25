local neons_on = false
local headlights_on = false
local vehicle = nil

--- @section Local Functions

--- Helper function to get players vehicle.
local function get_player_vehicle()
    local playerPed = PlayerPedId()
    if IsPedInAnyVehicle(playerPed, false) then
        return GetVehiclePedIsIn(playerPed, false)
    end
    return nil
end

--- Function to check if neon lights are enabled
local function are_neon_lights_on(vehicle)
    for i = 0, 3 do
        if IsVehicleNeonLightEnabled(vehicle, i) then
            return true
        end
    end
    return false
end

--- Handle color updates for both headlights and neons.
RegisterNUICallback('update_colour', function(data)
    if not data then print('Data missing.') return end
    local r, g, b = tonumber(data.r), tonumber(data.g), tonumber(data.b)
    local light_type = tostring(data.type)
    vehicle = get_player_vehicle()
    if not vehicle then return end
    if light_type == 'headlights' then
        if IsToggleModOn(vehicle, 22) then
            SetVehicleXenonLightsCustomColor(vehicle, r, g, b)
        else
            print('This vehicle does not have Xenon lights installed.')
        end
    elseif light_type == 'neons' then
        SetVehicleNeonLightsColour(vehicle, r, g, b)
    end
end)

--- Handle toggling the neons and headlights.
RegisterNUICallback('toggle_lights', function(data)
    if not data then print('Data missing.') return end
    local type = tostring(data.type)
    vehicle = get_player_vehicle()
    if not vehicle then return end
    if type == 'neons' then
        neons_on = data.neon_state
        for i = 0, 3 do
            SetVehicleNeonLightEnabled(vehicle, i, neons_on)
        end
    elseif type == 'headlights' then
        headlights_on = data.headlight_state
        if headlights_on then
            SetVehicleLights(vehicle, 2)
        else
            SetVehicleLights(vehicle, 1)
        end
    end
end)

--- Closes the UI and removes focus.
RegisterNUICallback('close_ui', function()
    SetNuiFocus(false, false)
end)

--- @section Commands

--- Open controller ui.
RegisterCommand('rgb', function()
    vehicle = get_player_vehicle()
    if not vehicle then return end
    local has_xenons = IsToggleModOn(vehicle, 22)
    local neon_status = are_neon_lights_on(vehicle)
    local _, lights_on, _ = GetVehicleLightsState(vehicle)
    SendNUIMessage({
        action = 'open_controller',
        has_xenons = has_xenons,
        neon_state = neon_status,
        headlight_state = lights_on
    })

    SetNuiFocus(true, true)
end)

--- @section Testing

--- Test command to add xenons to a vehicle you should remove if not needed.
RegisterCommand('addxenons', function()
    vehicle = get_player_vehicle()
    if not vehicle then
        print("You are not in a vehicle.")
        return
    end
    ToggleVehicleMod(vehicle, 22, true) 
    print("Xenon lights installed.")
end)
