import { createSignal } from "solid-js";

const numberFormat = (number: number) => {
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
    number,
  )
}

export default function Finance() {
  const [initialAmount, setInitialAmount] = createSignal(1000);
  const [days, setDays] = createSignal(30);

  const [hasInvite, setHasInvite] = createSignal(false);

  const interestRate = 0.88;

  const calculateCompoundInterest = (amount: number) => {
    return (amount * interestRate) / 100;
  }

  const calculateValue = () => {
    // let value = initialAmount();
    let interest = 0;
    for (let i = 0; i < days(); i++) {
      let signalThree = 0;

      // signal 1
      const signalOne = calculateCompoundInterest(interest + initialAmount());
      // console.log(signalOne, 'signalOne');

      // signal 2
      const signalTwo = calculateCompoundInterest((interest + signalOne) + initialAmount());

      if (hasInvite()) {
        signalThree = calculateCompoundInterest((interest + signalTwo + signalOne) + initialAmount());
      }

      interest = interest + (signalOne + signalTwo + signalThree);
    }
    return interest;
  }


  return (
    <main class=" mx-auto flex flex-col p-4 gap-14 ">

      <section class="flex flex-col sm:flex-row gap-3">



        <div class="flex flex-col gap-1">
          <label for="initial">Initial amount (USD)</label>
          <input
            onInput={(e) => setInitialAmount(Number(e.target.value))}
            class="border border-gray-500 p-1 rounded-sm" type="number"
            value={initialAmount()} placeholder="Initial amount" id="initial" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="days">Days</label>
          <input
            onInput={(e) => setDays(Number(e.target.value))}
            class="border border-gray-500 p-1 rounded-sm" type="number"
            value={days()} placeholder="Days" id="days" />
        </div>


      </section>

      <section class="flex items-center gap-2">

        <input type="checkbox" id="hasInvite" onChange={(e) => {
          // console.log(e.target.checked);
          setHasInvite(e.target.checked)
        }} />
        <label for="hasInvite" class=" cursor-pointer">Do you have an invite? (600 USD) </label>
      </section>

      <div>
        <div class="border border-gray-500  max-w-fit p-2 rounded-sm flex gap-2">
          <span> Starting amount: {numberFormat(initialAmount())} </span>
          <span class="text-red-500">|</span>
          <span> Days: {days()} </span>
        </div>

        <br />

        <div>
          <b> Interest:</b> {numberFormat(calculateValue())}
        </div>
        <div>
          <b>Total:</b> {(
            (calculateValue() + initialAmount()).toFixed(2)
          )} {' '}

          <i>(Ksh {numberFormat((calculateValue() + initialAmount()) * 130)})</i>
        </div>
      </div>


    </main>
  );
}
