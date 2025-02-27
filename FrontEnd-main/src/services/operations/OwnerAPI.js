import {setToken} from '../../reducer/slices/authSlice';
import {apiConnector} from '../apiconnector';
import {ownerEndpoints} from '../apis';
import {
  submitPGInfoFailure,
  resetPGInfo,
  fetchPGDetailsSuccess,
  fetchPGDetailsFailure,
  fetchRoomChartSuccess,
  fetchRoomChartFailure,
} from '../../reducer/slices/pgSlice';

import {
  fetchOwnerDetailsSuccess,
  fetchOwnerDetailsFailure,
  resetOwner,
} from '../../reducer/slices/ownerSlice';

const {
  CREATE_PG_API,
  GET_PG_API,
  GET_PG_DETAILS_API,
  GET_OWNER_DETAILS_API,
  GET_ROOM_CHART_API,
} = ownerEndpoints;

export function finalSubmitPGInfo(pgData, navigation, toast) {
  return async dispatch => {
    let id = toast.show('Submitting PG Details...', {type: 'normal'});
    try {
      console.log('PG Data Sent to API:', JSON.stringify(pgData, null, 2));

      const response = await apiConnector('POST', CREATE_PG_API, pgData);

      console.log('API Response:', response.data);

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, {type: 'danger'});
        dispatch(submitPGInfoFailure(response.data.message));
        return;
      }
      toast.hide(id);
      toast.show('PG Details Saved Successfully!', {type: 'success'});
      dispatch(resetPGInfo());
      navigation.navigate('PG Summary');
    } catch (error) {
      console.error(
        'Error submitting PG info:',
        error.response?.data || error.message,
      );
      toast.hide(id);
      toast.show(
        error.response?.data?.message || 'Submission Failed. Try Again.',
        {type: 'danger'},
      );
      dispatch(submitPGInfoFailure(error.message));
    }
  };
}

export function GetPG(data, navigation, toast) {
  return async dispatch => {
    let id = toast.show('Getting PG Details...', {type: 'normal'});
    try {
      const response = await apiConnector('GET', GET_PG_API, data);
      console.log('API Response:', response.data);

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, {type: 'danger'});
        return;
      }

      // Dispatch success action with the fetched data
      dispatch(fetchPGDetailsSuccess(response.data.data));

      toast.hide(id);
      toast.show('PG Details Fetched Successfully!', {type: 'success'});
    } catch (error) {
      toast.hide(id);
      toast.show('Failed to fetch PG details.', {type: 'danger'});

      // Dispatch failure action with error message
      dispatch(fetchPGDetailsFailure(error.message));

      if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    }
  };
}

export function PGdetails(navigation, toast) {
  return async dispatch => {
    try {
      const response = await apiConnector('GET', GET_PG_DETAILS_API);

      if (!response.data.success) {
        toast.show(response.data.message, {type: 'danger'});
        return null;
      }

      const pgDetails = response.data.pgDetails || [];
      dispatch(fetchPGDetailsSuccess(pgDetails));

      return pgDetails;
    } catch (error) {
      toast.show('Failed to fetch PG details.', {type: 'danger'});
      dispatch(fetchPGDetailsFailure(error.message));
      throw error;
    }
  };
}

export function GetOwnerDetails(ownerId, navigation, toast) {
  return async dispatch => {
    let id = toast.show('Fetching Owner Details...', {type: 'normal'});
    try {
      const response = await apiConnector(
        'GET',
        GET_OWNER_DETAILS_API(ownerId),
      );

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, {type: 'danger'});
        return;
      }

      const ownerName = response.data.owner.name;
      dispatch(fetchOwnerDetailsSuccess(ownerName));
      toast.hide(id);
      toast.show('Owner Details Fetched Successfully!', {type: 'success'});
    } catch (error) {
      toast.hide(id);
      toast.show('Failed to fetch Owner details.', {type: 'danger'});
      dispatch(fetchOwnerDetailsFailure(error.message));
      console.error('Error in GetOwnerDetails:', error);
    }
  };
}

export function GetRoomChart(pgBuildingId, navigation, toast) {
  console.log("First: Fetching Room Chart");
  console.log("PG Building ID:", pgBuildingId);

  return async (dispatch) => {
    let id = toast.show('Fetching Room Chart...', { type: 'normal' });

    try {
      const response = await apiConnector('GET', GET_ROOM_CHART_API(pgBuildingId));
      if (response.status !== 200) {
        throw new Error('Failed to fetch Room Chart');
      }
      const { data } = response;
      if (!data.success) {
        throw new Error(data.message || 'Room Chart fetch failed');
      }
      dispatch(fetchRoomChartSuccess(data.floors));

      toast.hide(id);
      toast.show('Room Chart Fetched Successfully!', { type: 'success' });
    } catch (error) {
      toast.hide(id);
      toast.show(error.message || 'Failed to fetch Room Chart.', { type: 'danger' });
      dispatch(fetchRoomChartFailure(error.message || 'Unknown error'));
      console.error("Error in GetRoomChart:", error);
    }
  };
}
