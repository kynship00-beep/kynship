const submissions = []; // In-memory log (resets on cold start – replace with DB when ready)

function validateContact({ name, phone, message, projectType }) {
    const errors = {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.name = 'الاسم مطلوب';
    }
    if (!phone || typeof phone !== 'string' || !/^[\d\s\+\-]{7,15}$/.test(phone.trim())) {
        errors.phone = 'رقم هاتف غير صحيح';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
        errors.message = 'الرسالة مطلوبة';
    }
    if (!projectType || typeof projectType !== 'string' || projectType.trim().length === 0) {
        errors.projectType = 'نوع المشروع مطلوب';
    }
    return errors;
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { name, phone, message, projectType } = req.body || {};

    const errors = validateContact({ name, phone, message, projectType });
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    const submission = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        message: message.trim(),
        projectType: projectType.trim(),
        submittedAt: new Date().toISOString(),
    };

    // Log to memory (replace with email/DB integration as needed)
    submissions.push(submission);
    console.log('📩 New contact submission:', submission);

    return res.status(200).json({
        success: true,
        message: 'تم استلام رسالتك بنجاح. سنتواصل معك قريباً.',
    });
}
