<script lang="ts">
  const API_KEY = "d1dbab06b7e36a609cc20f94";
  let SUPPORTED_CODES: [string] = ["Loading"];
  let originalCurrency: string;
  let exchangeCurrency: string;
  let conversionRate: number;
  let exchangeValue = 0;
  let originalValue = 0;
  let valuesEnable = true;

  async function getSupportedCodes() {
    let response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`,
    );
    let content = await response.text();

    JSON.parse(content);

    return JSON.parse(content).supported_codes;
  }

  getSupportedCodes().then((codes) => {
    SUPPORTED_CODES = codes;
  });

  const setOriginalValue = (value: number) => {
    originalValue = value;
  };

  const setExchangedValue = (value: number) => {
    exchangeValue = value;
  };

  async function getExchangeConversionRate() {
    if (
      originalCurrency !== "Select currency" &&
      exchangeCurrency !== "Select currency"
    ) {
      valuesEnable = false;

      let response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${originalCurrency}/${exchangeCurrency}`,
      );
      let content = await response.text();

      JSON.parse(content);

      conversionRate = JSON.parse(content).conversion_rate;
    }
  }
</script>

<div class="changer_wrapper">
  <div class="currency_wrapper">
    <p>Original currency</p>
    <select
      bind:value={originalCurrency}
      on:change={() => getExchangeConversionRate()}
      class="currencyChoice"
    >
      <option selected={true}>Select currency</option>
      {#each SUPPORTED_CODES as code}
        <option value={code[0]}>{code}</option>
      {/each}
    </select>
    <input
      bind:value={originalValue}
      on:change={() => {
        if (
          originalCurrency !== "Select currency" &&
          exchangeCurrency !== "Select currency"
        ) {
          setExchangedValue(
            Math.round(originalValue * 100 * conversionRate) / 100,
          );
        }
      }}
      placeholder="Value"
      disabled={valuesEnable}
      type="number"
    />
  </div>
  <div class="currency_wrapper">
    <p>Exchanged currency</p>
    <select
      bind:value={exchangeCurrency}
      on:change={() => getExchangeConversionRate()}
      class="currencyChoice"
    >
      <option selected={true}>Select currency</option>
      {#each SUPPORTED_CODES as code}
        <option value={code[0]}>{code}</option>
      {/each}
    </select>
    <input
      bind:value={exchangeValue}
      on:change={() => {
        if (
          originalCurrency !== "Select currency" &&
          exchangeCurrency !== "Select currency"
        ) {
          setOriginalValue(
            Math.round((exchangeValue * 100) / conversionRate) / 100,
          );
        }
      }}
      placeholder="Value"
      disabled={valuesEnable}
      type="number"
    />
  </div>
</div>

<style>
  .changer_wrapper {
    display: flex;
    gap: 20px;
  }
  .currency_wrapper {
    display: grid;
    grid-template-rows: auto auto;
    gap: 10px;
  }
</style>
