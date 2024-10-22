// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5Lg4TVQO4sNE4rYuzi0NzEnZm4ZSMzEk",
    authDomain: "weekly-plan-one.firebaseapp.com",
    projectId: "weekly-plan-one",
    storageBucket: "weekly-plan-one.appspot.com",
    messagingSenderId: "336937670479",
    appId: "1:336937670479:web:3284f4e43b94eed8d6973a",
    measurementId: "G-6PJJBS9QN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listeners
document.getElementById('monthInput').addEventListener('change', function() {
    document.getElementById('weekSelectorDiv').style.display = 'block';
});

document.getElementById('weekSelector').addEventListener('change', function() {
    document.getElementById('gradeSelectorDiv').style.display = 'block';
});

document.getElementById('gradeSelector').addEventListener('change', async function() {
    const month = document.getElementById('monthInput').value;
    const week = document.getElementById('weekSelector').value;
    const grade = document.getElementById('gradeSelector').value;
    
    // بناء اسم المجموعة بناءً على المدخلات
    const collectionName = `${month}-${week}`;

    // جلب البيانات من Firestore
    const q = query(collection(db, collectionName), where("classroom", "==", grade));
    const querySnapshot = await getDocs(q);
    
    // ملء الجدول بالبيانات
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // مسح أي بيانات سابقة

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = `
            <tr>
                <td>${data.subject}</td>
                <td>${data.sunday}</td>
                <td>${data.monday}</td>
                <td>${data.tuesday}</td>
                <td>${data.wednesday}</td>
                <td>${data.thursday}</td>
            </tr>
        `;
        tbody.innerHTML += row; // إضافة الصف الجديد
    });

    document.getElementById('tableDiv').style.display = 'block'; // إظهار الجدول بعد إضافة البيانات
});
