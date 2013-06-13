/*
 * The MIT License
 *
 * Copyright (c) 2013 Petar Petrov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package net.vexelon.pravitelstvobg;

import org.apache.cordova.CordovaArgs;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONException;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;

public class Version extends CordovaPlugin {
	
    public final String ACTION_GET_VERSION_NAME = "GetVersionName"; 
    public final String ACTION_GET_VERSION_CODE = "GetVersionCode";	

	@Override
	public boolean execute(String action, CordovaArgs args,
			CallbackContext callbackContext) throws JSONException {
		
        PackageManager packageManager = this.cordova.getActivity().getPackageManager();
        PackageInfo packageInfo;
		try {
			packageInfo = packageManager.getPackageInfo(
					this.cordova.getActivity().getPackageName(), 0);
		} catch (NameNotFoundException e) {
			callbackContext.error(e.getMessage());
			return false;
		}        
        
        if(action.equals(ACTION_GET_VERSION_CODE)) {
            callbackContext.success(packageInfo.versionCode);
        } else if (action.equals(ACTION_GET_VERSION_NAME)) {
            callbackContext.success(packageInfo.versionName);
        } else {
        	callbackContext.error("Expected one non-empty string argument.");
        	return false;
        }

        return true;
	}
	
}
