const BASE_URL = "http://localhost:5000/api";

export const getCampaign = async () => {
  const res = await fetch(`${BASE_URL}/campaign`);
  return res.json();
};

export const changeStatus = async (status) => {
  const res = await fetch(`${BASE_URL}/campaign/status`,{
    method:"PATCH",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({status})
  });
  return res.json();
};

export const withdraw = async () => {
  const res = await fetch(`${BASE_URL}/campaign/withdraw`,{
    method:"POST"
  });
  return res.json();
};
