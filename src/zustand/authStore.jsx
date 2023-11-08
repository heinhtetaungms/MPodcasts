import Cookies from 'js-cookie';
import { create } from 'zustand';

const authStore = create((set) => {
	const storedId = Cookies.get('hid');
	const storedToken = Cookies.get('htoken');
	const storedEmail = Cookies.get('hemail');
	const storedFirstName = Cookies.get('hfirstName');
	const storedLastName = Cookies.get('hlastName');
	const storedUserName = Cookies.get('husername');
	const storedProfileImageUrl = Cookies.get('hprofileImageUrl');
	const storedJoinDate = Cookies.get('hjoinDate');
	const storedRole = Cookies.get('hrole');
	const storedSidebarToggle = Cookies.get('toggle');
	const storedTheme = Cookies.get('htheme');
	const storedKey = Cookies.get('hstatusvip');

	return {
		userId: storedId || null,
		statusId: storedKey || null,
		token: storedToken || null,
		email: storedEmail || null,
		firstName: storedFirstName || null,
		lastName: storedLastName || null,
		username: storedUserName || null,
		profileImageUrl: storedProfileImageUrl || null,
		joinDate: storedJoinDate || null,
		role: storedRole || null,
		sidebarToggle: storedSidebarToggle || true,
		theme: storedTheme || 'light',
		profileToggle: false,

		setstatusId: (newstatusId) => {
			set({ statusId: newstatusId });
			Cookies.set('hstatusvip', newstatusId, { expires: 2 });
		},
		setId: (newId) => {
			set({ userId: newId });
			Cookies.set('hid', newId, { expires: 2 });
		},
		setToken: (newToken) => {
			set({ token: newToken });
			Cookies.set('htoken', newToken, { expires: 2 });
		},
		setEmail: (newEmail) => {
			set({ email: newEmail });
			Cookies.set('hemail', newEmail, { expires: 2 });
		},
		setFirstName: (newFirstName) => {
			set({ firstName: newFirstName });
			Cookies.set('hfirstName', newFirstName, { expires: 2 });
		},
		setLastName: (newLastName) => {
			set({ lastName: newLastName });
			Cookies.set('hlastName', newLastName, { expires: 2 });
		},
		setUserName: (newUserName) => {
			set({ username: newUserName });
			Cookies.set('husername', newUserName, { expires: 2 });
		},
		setProfileImageUrl: (newProfileImageUrl) => {
			set({ profileImageUrl: newProfileImageUrl });
			Cookies.set('hprofileImageUrl', newProfileImageUrl, { expires: 2 });
		},
		setJoinDate: (newJoinDate) => {
			set({ joinDate: newJoinDate });
			Cookies.set('hjoinDate', newJoinDate, { expires: 2 });
		},
		setRole: (newRole) => {
			set({ role: newRole });
			Cookies.set('hrole', newRole, { expires: 2 });
		},
		setToggle: (newToggle) => {
			set({ sidebarToggle: newToggle });
			Cookies.set('toggle', newToggle);
		},
		setTheme: (newTheme) => {
			set({ theme: newTheme });
			Cookies.set('htheme', newTheme, { expires: 2 });
		},
		setToggleProfile: (newToggleProfile) => {
			set({ profileToggle: newToggleProfile});
			Cookies.set('hprofileToggle', newToggleProfile, {expires: 2});
		},
		logout: () => {
			set({
				token: null,
				email: null,
				firstName: null,
				lastName: null,
				username: null,
				profileImageUrl: null,
				joinDate: null,
				role: null,
				sidebarToggle: null,
			});
			Cookies.remove('htoken');
			Cookies.remove('hemail');
			Cookies.remove('hfirstName');
			Cookies.remove('hlastName');
			Cookies.remove('husername');
			Cookies.remove('hprofileImageUrl');
			Cookies.remove('hjoinDate');
			Cookies.remove('hrole');
			Cookies.remove('toggle');
			Cookies.remove('hprofileToggle');
		},
	};
});

export default authStore;
