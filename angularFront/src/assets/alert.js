function alertFunction(waterLevel) {
        waterValue = waterLevel[0].SensorValue;
        if(waterValue> 200){
                alert("Įrenginyje yra vandens!");
        }
}