import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
    if (!MIXPANEL_TOKEN) {
        console.warn('Mixpanel token is missing! Check your .env file.');
        return;
    }

    mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
//     mixpanel.track("Played song",{
//     "View Item": "Claim Offer"  // with an event property "genre" set to "hip-hop"
//     }
// );
}