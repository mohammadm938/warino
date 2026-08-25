export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ success: false, message: "ایمیل نامعتبر است" }),
        { status: 400 }
      );
    }

    // ارسال به Google Apps Script
    const response = await fetch("https://sheetdb.io/api/v1/cj25jv1t9np6c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, date: new Date().toISOString() }),
    });

    if (!response.ok) {
      throw new Error("خطا در ذخیره ایمیل");
    }

    return new Response(
      JSON.stringify({ success: true, message: "ایمیل با موفقیت ثبت شد" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "خطا در سرور",
        messageError: err.message,
      }),
      { status: 500 }
    );
  }
}
