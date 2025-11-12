import { LitElement, html } from 'lit';

class LoginPage extends LitElement {
    render() {
        return html`
            <div
                class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden"
                style="font-family: 'Work Sans', 'Noto Sans', sans-serif;"
            >
                <div class="flex w-full flex-col p-4 pt-8">
                    <!-- 1. Image/Illustration -->
                    <div class="flex w-full justify-center pb-6">
                        <img
                            alt="A stylized graphic of a plant sprouting from recycled materials, symbolizing growth and sustainability."
                            class="h-24 w-24 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkzi5HdVYgTQrdyPtnTCsHrB0AynTbLmVFSJAsdD6t1cVJDKfNz2Bv3CvY9McQuT-n5tuzU34NwUAo0hDn5iqcLjq7FXg8LU86zYiIV5LqyhuhzESVinPh6weSyF0QZzqHpdt_z_6BgApI9i0P24wZddz4EZNXbps9li3g2iG2hSw6w6VmjCJvX_TBr_1DusFnYRGyscz8uRmnKQ4PdwC-zBnDFy6vPO4wPUTs5UQZhFdcWGo4sBElXBJoa8x0s711fWuDUhYUdlc"
                        />
                    </div>
                    <!-- 2. Headline and Body Text -->
                    <h1
                        class="text-secondary dark:text-gray-200 tracking-tight text-[28px] font-bold leading-tight px-4 text-center pb-2"
                    >
                        به دنیای پاک خوش آمدید
                    </h1>
                    <p
                        class="text-secondary/70 dark:text-gray-400 text-base font-normal leading-normal pb-6 px-4 text-center"
                    >
                        برای مشارکت در بازیافت، وارد شوید یا حساب کاربری جدید بسازید.
                    </p>
                    <!-- 3. Segmented Buttons for Login/Signup -->
                    <div class="flex px-4 py-3">
                        <div
                            class="flex h-12 flex-1 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 p-1"
                        >
                            <label
                                class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 has-checked:bg-white dark:has-checked:bg-zinc-700shas-checked:shadow-smshas-checked:text-secondaryrk:has-[:checked]:text-white text-secondary/60 dark:text-gray-400 text-sm font-medium leading-normal transition-all"
                            >
                                <span class="truncate">ورود</span>
                                <input
                                    checked
                                    class="invisible w-0"
                                    name="auth-toggle"
                                    type="radio"
                                    value="ورود"
                                />
                            </label>
                            <label
                                class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 has-checked:bg-whiterdark:has-checked:bg-zinc-700shas-checked:shadow-smshas-checked:text-secondaryrk:has-[:checked]:text-white text-secondary/60 dark:text-gray-400 text-sm font-medium leading-normal transition-all"
                            >
                                <span class="truncate">ثبت‌نام</span>
                                <input
                                    class="invisible w-0"
                                    name="auth-toggle"
                                    type="radio"
                                    value="ثبت‌نام"
                                />
                            </label>
                        </div>
                    </div>
                    <!-- 4. Form Fields -->
                    <div class="w-full space-y-4 px-4 py-3">
                        <!-- Name Field (for signup) -->
                        <!-- This field would be conditionally shown -->
                        <!-- <label class="flex flex-col min-w-40 flex-1">
                <p class="text-secondary dark:text-gray-300 text-sm font-medium leading-normal pb-2">نام و نام خانوادگی</p>
                <div class="relative flex w-full items-center">
                    <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-secondary dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 h-14 placeholder:text-gray-400 dark:placeholder:text-zinc-500 p-4 pr-12 text-base font-normal leading-normal" placeholder="نام خود را وارد کنید" type="text" value=""/>
                    <span class="material-symbols-outlined absolute right-4 text-gray-400 dark:text-zinc-500">person</span>
                </div>
            </label> -->
                        <!-- Mobile Number Field -->
                        <label class="flex flex-col min-w-40 flex-1">
                            <p
                                class="text-secondary dark:text-gray-300 text-sm font-medium leading-normal pb-2"
                            >
                                شماره موبایل
                            </p>
                            <div class="relative flex w-full items-center">
                                <input
                                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-secondary dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 h-14 placeholder:text-gray-400 dark:placeholder:text-zinc-500 p-4 pr-12 text-base font-normal leading-normal"
                                    placeholder="09123456789"
                                    type="tel"
                                />
                                <span
                                    class="material-symbols-outlined absolute right-4 text-gray-400 dark:text-zinc-500"
                                    >phone_iphone</span
                                >
                            </div>
                        </label>
                        <!-- Password Field -->
                        <label class="flex flex-col min-w-40 flex-1">
                            <p
                                class="text-secondary dark:text-gray-300 text-sm font-medium leading-normal pb-2"
                            >
                                رمز عبور
                            </p>
                            <div class="relative flex w-full items-center">
                                <input
                                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-secondary dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 h-14 placeholder:text-gray-400 dark:placeholder:text-zinc-500 p-4 pr-12 text-base font-normal leading-normal"
                                    placeholder="••••••••"
                                    type="password"
                                />
                                <span
                                    class="material-symbols-outlined absolute right-4 text-gray-400 dark:text-zinc-500"
                                    >lock</span
                                >
                            </div>
                        </label>
                        <!-- Forgot Password Link -->
                        <div class="flex justify-end pt-1">
                            <a class="text-accent text-sm font-medium hover:underline" href="#"
                                >فراموشی رمز عبور؟</a
                            >
                        </div>
                    </div>
                    <!-- 5. Primary Action Button -->
                    <div class="px-4 pt-4 pb-6">
                        <button
                            class="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold leading-normal shadow-md hover:bg-primary/90 transition-colors"
                        >
                            ورود به حساب کاربری
                        </button>
                    </div>
                    <!-- 6. Social Login Section -->
                    <div class="flex items-center gap-4 px-4 py-2">
                        <hr class="grow border-t border-gray-300 dark:border-zinc-600" />
                        <p class="text-secondary/70 dark:text-gray-400 text-sm">یا ورود از طریق</p>
                        <hr class="grow border-t border-gray-300 dark:border-zinc-600" />
                    </div>
                    <div class="flex justify-center px-4 py-4">
                        <button
                            class="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-secondary dark:text-gray-200 text-base font-medium leading-normal hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <img
                                alt="Google logo"
                                class="h-6 w-6"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEEuAog0xo8uaRhv_ltHUAGY1EZxOBa88liMmCa7myBF-O2ryMUdJL_V63ryPYCAffPG07JKtGxBxWgHB1wePViml9OrRqJg4CALdjxwprFsxNRwImPkojZTiODKbr2awevfNfeWr4UBd7ZG0u0rpQkUtowO9d9dHBC00YahetsfOPFoC48kTyLmzkaYhgabdN2bsM2j9Kd2FWkNT7St-msbK_elsINH8MTvHbz3oljDqRiE3oGiC9CWuTIVtvDVso6uR4lNWSoFY"
                            />
                            <span>ورود با گوگل</span>
                        </button>
                    </div>
                    <!-- 7. Footer Text -->
                    <div class="px-4 pt-8 text-center">
                        <p class="text-secondary/60 dark:text-gray-500 text-xs">
                            با ورود یا ثبت‌نام، شما با
                            <a class="font-medium text-accent hover:underline" href="#"
                                >شرایط و قوانین</a
                            >
                            ما موافقت می‌کنید.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    createRenderRoot() {
        return this;
    }
}
customElements.define('login-page', LoginPage);
