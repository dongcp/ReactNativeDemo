package com.helloanimation.location;

import android.Manifest;
import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;
import android.util.Log;
import com.helloanimation.R;

public class LocationService extends Service {
    public static final String ACTION_START_UPDATE_USING_NETWORK = "START_UPDATE_USING_NETWORK";
    public static final String ACTION_START_UPDATE_USING_GPS = "START_UPDATE_USING_GPS";
    public static final String ACTION_UPDATE_LOCATION = "UPDATE_LOCATION";

    private static final int GEO_LOCATION_NOTIFICATION_ID = 421;
    private static final String NOTIFICATION_CHANNEL_ID = "com.vtp.vtmove";

    private LocationManager mLocationManager;

    private boolean mIsStarted;

    private LocationListener mLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            Log.e("Location changed", "" + location.getLatitude() + "_" + location.getLongitude());
            Intent intent = new Intent(ACTION_UPDATE_LOCATION);
            intent.putExtra("LOCATION", location);
            LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(intent);
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {

        }

        @Override
        public void onProviderEnabled(String provider) {

        }

        @Override
        public void onProviderDisabled(String provider) {

        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        mLocationManager = (LocationManager) getApplicationContext()
                .getSystemService(LOCATION_SERVICE);
        mIsStarted = false;
    }


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!mIsStarted) {
            mIsStarted = true;
            startForeground(GEO_LOCATION_NOTIFICATION_ID, getNotification());
        }
        if (intent != null && !TextUtils.isEmpty(intent.getAction())) {
            switch (intent.getAction()) {
                case ACTION_START_UPDATE_USING_GPS:
                    Log.e("Check", "Using gps");
                    startUpdateLocation(LocationManager.GPS_PROVIDER);
                    break;
                case ACTION_START_UPDATE_USING_NETWORK:
                    Log.e("Check", "Using network");
                    startUpdateLocation(LocationManager.NETWORK_PROVIDER);
                    break;
            }
        }

        return START_STICKY;
    }

    private void startUpdateLocation(String locationProvider) {
        if (ActivityCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            mLocationManager.removeUpdates(mLocationListener);

            mLocationManager.requestLocationUpdates(
                    locationProvider, 10000, 0, mLocationListener);
        }
    }

    private void configureLocation() {

    }

    private Notification getNotification() {
        NotificationCompat.Builder notificationBuilder =
                new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);

        notificationBuilder
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle("VT Move")
                .setContentText("We are getting your location")
                .setAutoCancel(false)
                .setOngoing(true);

        return notificationBuilder.build();
    }
}
