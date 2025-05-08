function filterSchemes(schemes, user) {
    return schemes.filter(scheme => {
      const { age, income, location, profession } = user;
      const eligible = scheme.eligibility;
  
      const ageOk = !eligible.age || age >= eligible.age;
      const incomeOk = !eligible.income || income <= eligible.income;
      const locationOk = eligible.location === "any" || eligible.location.toLowerCase() === location.toLowerCase();
      const professionOk = eligible.profession === "any" || eligible.profession.toLowerCase() === profession.toLowerCase();
  
      return ageOk && incomeOk && locationOk && professionOk;
    });
  }
  
  export default filterSchemes;
  