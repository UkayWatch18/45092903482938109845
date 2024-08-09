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
  
  function delay(min, max) {
    return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));
  }
  
  async function checkElementVisibility(selector, interval = 100) {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const element = document.querySelector(selector);
        if (element && window.getComputedStyle(element).display == 'none') {
          clearInterval(intervalId);
          resolve(element);
        }
      }, interval);
    });
  }
  
  async function main() {
    await _wait('#skip');
    delay(1000, 2000);
    const showTimer = await checkElementVisibility('#showTimer');
    console.log('#showTimer is visible:', showTimer);
    const showSkip = await _wait("#showSkip");
    const skip_button = await _wait('.skip');
    skip_button.click();
  }
  
  await main();
  
