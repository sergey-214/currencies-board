<?php

namespace App\Console;

use App\Events\SendCurrency;
use App\Models\Currency;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Http;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            
            $response = \Illuminate\Support\Facades\Http::get('https://api.monobank.ua/bank/currency');

            if ($response->ok()) {
                $currency = Currency::firstOrNew();
                $currency->data = $response->json();
                $currency->save();
                
                event(new SendCurrency(['currency_changed' => true]));
            } 

        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
