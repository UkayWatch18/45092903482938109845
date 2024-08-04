const logs = [];

async function sendLogsToWebhook() {
  const webhookURL = 'https://discord.com/api/v10/webhooks/1268538536517304415/rnGxzcssVzGukWQ1Jw-5enMmgwczxYIEKHFgpnSTbP49hHVPgfTD-Ev6ck0-v8S7sPLG?wait=true';
  
  const payload = {
      content: `Hey, @everyone Log file is here!\n\n*Log* :\n${logs.join('\n')}`,
      embeds: null,
      attachments: []
  };

  try {
      await fetch(webhookURL, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
              'Content-type': 'application/json'
          }
      });
  } catch (error) {
      console.log('[x] Error sending logs to Discord webhook:', error.message);
  }
}

async function sendToWebHook(message) {
  const webhookURL = 'https://discord.com/api/v10/webhooks/1268538536517304415/rnGxzcssVzGukWQ1Jw-5enMmgwczxYIEKHFgpnSTbP49hHVPgfTD-Ev6ck0-v8S7sPLG?wait=true';
  
  const payload = {
      content: `Hey, @everyone ${message}`,
      embeds: null,
      attachments: []
  };

  try {
      await fetch(webhookURL, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
              'Content-type': 'application/json'
          }
      });
  } catch (error) {
      console.log('[x] Error sending logs to Discord webhook:', error.message);
  }
}

async function log(message) {
  logs.push(message);
  console.log(message);
  //await sendToWebHook(message);
}


async function _wait(selector, timeout = null) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          resolve(element);
        }
      }, 100);
  
      if (timeout !== null) {
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error('[x] Timeout for element'));
        }, timeout);
      }
    });
  }
  
  // function delay(min, max) {
  //   return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));
  // }

  function delay(min, max) {
    const rv = max * min;
  }
  
  async function arrive() {
    try {
      const cookies_accept = await _wait('#cookiesAcceptButton', 5000);
      cookies_accept.click();
      await log('[-] Cookies accepted');
  
      await delay(1457, 2798);
      await log('[-] Delay after clicking cookies button');
    } catch (error) {
      await log('[x] Cookies were not found');
    }
  }
  
  async function get() {
    try {
      const get_button = await _wait('.action-box__cta-button.lv-lib-button--primary.lv-lib-button--lg.lv-lib-button--rounded');
      get_button.click();
      await log('[-] Get button was pressed');
    } catch (error) {
      await log('[x] Get button not found');
    }
  }
  
  async function determine() {
    let adsExists = false;
    let headerExists = false;
  
    try {
      await _wait('.adStepHead', 10000);
      adsExists = true;
    } catch (error) {
    //   log('Ads element not found.');
    }
  
    try {
      await _wait('.lv-popover-header', 10000);
      headerExists = true;
    } catch (error) {
    //   log('Header element not found.');
    }
  
    if (adsExists && !headerExists) {
      await log('[-] Ads condition detected');
      await ads_scenario();
    } else if (!adsExists && headerExists) {
      await log('[-] Header condition detected');
      await header_scenario();
    } else if (adsExists && headerExists) {
      await log('[-] Header and Ads detected');
    } else {
      await log('[x] No condition detected');
    }
  }

  async function header_scenario() {
    try {
        await delay(1000, 1500);
        const is_header = await _wait('.lv-popover-header');
        await delay(13000, 13100);

        const get_access_button = await _wait('.lv-lib-button--full-width.lv-lib-button--secondary.lv-lib-button--lg.lv-lib-button--rounded');
        get_access_button.click();
        get_access_button.click();
        get_access_button.click();
        await log('[-] Header get button pressed');
    } catch (error) {
        await log(error);
    }
  }

  async function ads_scenario() {
    try {
        // Skipping
        await delay(798, 1789);
        const skip_button = await _wait('.buttonWrapper__button.lv-button-component.lv-button-size-desktop.lv-button-size-mobile.lv-darkgrey', 10000);
        
        const clicks = Math.floor(Math.random() * 4) + 2;
        await log(`[-] Clicking skip button ${clicks}  time(s)`);

        for (let i = 0; i < clicks; i++) {
            skip_button.click();
            //log(`[-] Skip button clicked ${i + 1} time(s)`);
            await delay(2134, 3256);
        }
        // Interests + Learn More + Continue
        await delay(1000, 2000);
        const interested_button = await _wait('.buttonWrapper__button.lv-button-component.lv-button-size-desktop.lv-button-size-mobile.lv-orange', 10000);
        interested_button.click();
        await log('[-] Clicking -Im Interested- Button');

        await delay(898, 1456);
        const more_button = await _wait('.cta--btn.lv-button-component.lv-button-size-desktop.lv-button-size-mobile.lv-orange');
        more_button.click();
        await log('[-] Clicking -Learn More- Button');

        try {
            await _wait('.step--form-rounded.step--form-rounded-completed.step--form-rounded-direct.step--form-rounded-inactive');
            await delay(1256, 1867);
            const continue_button = await _wait('.cta--btn.lv-button-component.lv-button-size-desktop.lv-button-size-mobile.cta--active.lv-darkgrey', 10000);
            continue_button.click();
            continue_button.click();
            continue_button.click();
            await log('[-] Clicking -Continue- Button');
        } catch (error) {
            await log('');
        }

        // Header function
        await header_scenario();

    } catch (error) {
      await log('[x] Error in ads_scenario:', error.message);
    }
  }

  async function main() {
    await sendToWebHook(" New bot is here!");
    await arrive();    // Wait for arrive to complete
    await get();       // Wait for get to complete
    await determine(); // Wait for determine to complete
    await sendLogsToWebhook();
  }
  
  main();
  
