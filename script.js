async function openGreeting() {
  const name = document.getElementById("name").value.trim();
  const birthday = document.getElementById("birthday").value.trim();
  const code = document.getElementById("code").value.trim();

  if (!name || !birthday || !code) {
    showModal("⚠️ ข้อมูลไม่ครบ", "กรุณากรอกชื่อ IG และวันเกิดและรหัสลับให้ครบ");
    return;
  }

  const snap = await db.collection("friends")
    .where("name", "==", name)
    .where("birthday", "==", birthday)
    .where("secretCode", "==", code)
    .get();

  if (snap.empty) {
    showModal("❌ ไม่พบข้อมูล", "ลองตรวจสอบชื่อ IG วันเกิด และรหัสลับอีกครั้ง");
    return;
  }

  const friend = snap.docs[0].data();
  showModal(`ถึง @${friend.name} 💌`, friend.message);

  // log การเข้าใช้งาน
  db.collection("logs").add({
    name: friend.name,
    openedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// ฟังก์ชัน modal
function showModal(title, message) {
  const modal = document.getElementById("greetingModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const closeBtn = modal.querySelector(".close");

  modalTitle.innerText = title;
  modalMessage.innerText = message;
  modal.style.display = "block";

  closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
}


  const birthday = `${month}-${day}`;

  // ถ้าใช้ Firebase
  const snapshot = await db.collection("friends")
    .where("name", "==", name)
    .where("birthday", "==", birthday)
    .get();

  if (snapshot.empty) {
    alert("❌ ไม่พบข้อมูล ลองตรวจสอบอีกครั้ง");
    return;
  }

  const friend = snapshot.docs[0].data();
  alert(`ถึง @${friend.name} 💌\n\n${friend.message}`);

  // log การเข้าใช้งาน
  db.collection("logs").add({
    name: friend.name,
    openedAt: firebase.firestore.FieldValue.serverTimestamp()
  });



