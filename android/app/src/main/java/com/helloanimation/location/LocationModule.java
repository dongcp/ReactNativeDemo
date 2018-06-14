package com.helloanimation.location;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.IntentSender;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import android.util.Log;

public class LocationModule extends ReactContextBaseJavaModule
        implements ActivityEventListener {
    private static final int RC_CHECK_SETTINGS = 509;

    private Location mCurrentLocation;

    private String mAction;
    private int mLocationPriority;

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);

        reactContext.addActivityEventListener(this);

        BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.e("Broadcast","Fuck");
                if(intent == null || TextUtils.isEmpty(intent.getAction())) {
                    Log.e("Broadcast","Dm");
                    return;
                }
                    switch (intent.getAction()) {
                        case LocationService.ACTION_UPDATE_LOCATION:
                            Log.e("Aloha","Ahuhu");
                            Location location = intent.getParcelableExtra("LOCATION");
                            sendEvent(location);
                            break;
                    }
            }
        };
        LocalBroadcastManager.getInstance(getReactApplicationContext())
                .registerReceiver(
                        broadcastReceiver, new IntentFilter(LocationService.ACTION_UPDATE_LOCATION));
    }

    @Override
    public String getName() {
        return "GeoLocation";
    }

    @ReactMethod
    public void startHighAccuracyMode() {
        Log.e("check function","start high accuracy");
        mAction = LocationService.ACTION_START_UPDATE_USING_GPS;
        mLocationPriority = LocationRequest.PRIORITY_HIGH_ACCURACY;
        startUpdateLocation(mAction, mLocationPriority);
    }

    @ReactMethod
    public void startLowPowerMode() {
        Log.e("check function","start low power");
        mAction = LocationService.ACTION_START_UPDATE_USING_NETWORK;
        mLocationPriority = LocationRequest.PRIORITY_LOW_POWER;
        startUpdateLocation(mAction, mLocationPriority);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == RC_CHECK_SETTINGS) {
                startUpdateLocation(mAction, mLocationPriority);
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent){

    }

    private void startUpdateLocation(final String action, int locationPriority) {
        LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(10000);
        locationRequest.setFastestInterval(5000);
        locationRequest.setPriority(locationPriority);

        LocationSettingsRequest.Builder builder =
                new LocationSettingsRequest.Builder();
        builder.addLocationRequest(locationRequest);
        builder.setAlwaysShow(true);

        SettingsClient settingsClient = LocationServices.getSettingsClient(getReactApplicationContext());
        Task<LocationSettingsResponse> task = settingsClient.checkLocationSettings(builder.build());
        task.addOnSuccessListener(new OnSuccessListener<LocationSettingsResponse>() {
            @Override
            public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
                Log.e("CheckLocationSetting","onSuccess");
                Intent intent = new Intent(getReactApplicationContext(), LocationService.class);
                intent.setAction(action);
                getReactApplicationContext().startService(intent);
            }
        });

        task.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                if (e instanceof ResolvableApiException) {
                    // Location settings are not satisfied, but this can be fixed
                    // by showing the user a dialog.
                    try {
                        // Show the dialog by calling startResolutionForResult(),
                        // and check the result in onActivityResult().
                        ResolvableApiException resolvable = (ResolvableApiException) e;
                        resolvable.startResolutionForResult(getCurrentActivity(), RC_CHECK_SETTINGS);
                    } catch (IntentSender.SendIntentException sendEx) {
                        // Ignore the error.
                    }
                }

            }
        });
    }

    private void sendEvent(Location location) {
        WritableMap map = Arguments.createMap();
        WritableMap coordMap = Arguments.createMap();
        coordMap.putDouble("latitude", location.getLatitude());
        coordMap.putDouble("longitude", location.getLongitude());
        coordMap.putDouble("accuracy", location.getAccuracy());
        coordMap.putDouble("altitude", location.getAltitude());
        coordMap.putDouble("heading", location.getBearing());
        coordMap.putDouble("speed", location.getSpeed());

        map.putMap("coords", coordMap);
        map.putDouble("timestamp", location.getTime());

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("updateLocation", map);
    }
}
