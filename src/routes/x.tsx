
import { createSignal } from "solid-js";

const numberFormat = (number: number) => {
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
        number,
    )
}

const bonus = 40;
const added_days = 5;

export default function Finance() {
    const [initialAmount, setInitialAmount] = createSignal(1000);
    const [days, setDays] = createSignal(30);
    const [invitees, setInvitees] = createSignal(0);

    const interestRate = 0.54;

    const calculateCompoundInterest = (amount: number) => {
        return (amount * interestRate) / 100;
    }

    const calculateValue = () => {
        // let value = initialAmount();
        let interest = 0;
        for (let i = 0; i < (days() + (invitees() * added_days)); i++) {
            // signal 1
            const signalOne = calculateCompoundInterest(interest + initialAmount());

            // signal 2
            const signalTwo = calculateCompoundInterest((interest + signalOne) + initialAmount());

            // signal 3
            const signalThree = calculateCompoundInterest((interest + signalTwo) + initialAmount());

            // signal 4
            const signalFour = calculateCompoundInterest((interest + signalThree) + initialAmount());

            interest = interest + (signalOne + signalTwo + signalThree + signalFour);
        }
        return interest + (invitees() * bonus);
    }


    return (
        <main class=" mx-auto flex flex-col p-4 gap-14 ">

            <h1 class=" text-green-400 text-xl font-bold ">Platform X</h1>
            <hr />

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
                <div class="flex flex-col gap-1">
                    <label for="days">Persons invited</label>
                    <input
                        onInput={(e) => setInvitees(Number(e.target.value))}
                        class="border border-gray-500 p-1 rounded-sm" type="number"
                        value={invitees()} placeholder="Persons invited" id="days" />
                </div>


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


// export default function x() {
//     const bonus = 40;
//     const days = 5;
//   return (
//     <div>x</div>
//   )
// }
