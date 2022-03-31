async function sendReport(report, token) {
  console.log(report, "report data en sendReport()");

  const res = await (
    await fetch(
      `https://lost-pet-finder-app.herokuapp.com/pets/reports?petId=${report.petId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(report),
      }
    )
  ).json();

  console.log(res, "res sendReport()");

  return res;
}

export { sendReport };
