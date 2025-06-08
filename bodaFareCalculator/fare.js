function calculateBodaFare() {
    let distanceInKm = Number(prompt("Unafika wapi Mkubwa? Kilometer ngapi?"));

    const baseFare = 50; // Standard starting fare
    const perKmCharge = 15; // Cost per kilometer
    const totalFare = baseFare + (distanceInKm * perKmCharge);

    console.log(`Uko kwote? Io ni ${distanceInKm} km:
    - Base Fare: KES ${baseFare}
    - Distance Charge: KES ${distanceInKm * perKmCharge}
    - Total Fare: KES ${totalFare}

    Panda Pikipiki! 🚀`);
}
