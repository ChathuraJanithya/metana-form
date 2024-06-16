import React, { useEffect, useState } from "react";

function FormState({ children, roles }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;
  return <>{children}</>;
}

export default FormState;
