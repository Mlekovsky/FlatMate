export const SET_LOADER_ACTIVITY = "SET_LOADER_ACTIVITY";

export const actionCreators = {
    /** Ustawia loader na widzialny bez tekstu lub z przekazanym */
    showLoader: (text?: string) => ({
        type: SET_LOADER_ACTIVITY,
        payload: {
            isVisible: true,
            text: text
        }
    }),
    /** Ustawia loader na niewidzialny */
    hideLoader: () => ({ 
        type: SET_LOADER_ACTIVITY, 
        payload: {
            isVisible: false,
            text: null
        }
    }),
    /** Ustawia loader na widzialny z tekstem "Please wait..." */
    showLoaderWithPleaseWaitText: () => (actionCreators.showLoader("Please wait...")),
    /** Ustawia loader na widzialny z tekstem "Searching..." */
    showLoaderWithSearchingText: () => (actionCreators.showLoader("Searching...")),
    /** Ustawia loader na widzialny z tekstem "Downloading..." */
    showLoaderWithDownloadingText: () => (actionCreators.showLoader("Downloading...")),
    /** Ustawia loader na widzialny z tekstem "Uploading..." */
    showLoaderWithUploadingText: () => (actionCreators.showLoader("Uploading...")),
    /** Ustawia loader na widzialny z tekstem "Saving..." */
    showLoaderWithSavingText: () => (actionCreators.showLoader("Saving..."))
};