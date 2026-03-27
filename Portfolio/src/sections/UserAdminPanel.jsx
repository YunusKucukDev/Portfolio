import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, CardActions, Button,
  Grid, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, CircularProgress, Avatar, Divider, List, ListItem, ListItemText, Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Yükleme ikonu için
import { useAppDispacth, useAppSelector } from "../Store/store";
import { selectAllUsers, fetchUsers, fetchUpdateUser } from "../Slices/UserSlice";

// Yardımcı bileşen: Etiket ve Değer ikilisi (Tasarım aynı)
const InfoRow = ({ label, value }) => (
  <ListItem sx={{ py: 0.5, px: 0, textAlign: { xs: 'center', md: 'left' } }}>
    <ListItemText
      primary={<Typography variant="caption" sx={{ color: 'rgb(241, 113, 8)', fontWeight: 'bold', display: 'block' }}>{label}</Typography>}
      secondary={<Typography variant="body2" sx={{ color: '#333', wordBreak: 'break-all' }}>{value || "Belirtilmemiş"}</Typography>}
    />
  </ListItem>
);

// Dosya yükleme butonu için stil (MUI Button tabanlı, turuncu tema)
const InputFileButton = ({ label, onChange, fileName }) => (
  <Stack direction="column" spacing={1} alignItems="center" sx={{ width: '100%', mt: 1 }}>
    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'rgb(241, 113, 8)' }}>{label}</Typography>
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUploadIcon />}
      sx={{
        color: 'rgb(241, 113, 8)',
        borderColor: 'rgb(241, 113, 8)',
        '&:hover': { borderColor: 'rgb(200, 90, 5)', bgcolor: 'rgba(241, 113, 8, 0.04)' },
        width: '100%',
        textTransform: 'none'
      }}
    >
      PDF Seç
      <input
        type="file"
        accept=".pdf"
        hidden // Standart inputu gizle
        onChange={onChange}
      />
    </Button>
    {fileName && (
      <Typography variant="caption" color="textSecondary" sx={{ wordBreak: 'break-all' }}>
        Seçildi: {fileName}
      </Typography>
    )}
  </Stack>
);

function UserAdminPanel() {
  const dispatch = useAppDispacth();
  const users = useAppSelector(selectAllUsers);
  const { status, error } = useAppSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dosyalar için ayrı state'ler
  const [fileTr, setFileTr] = useState(null);
  const [fileEn, setFileEn] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setSelectedUser({ ...user });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setFileTr(null); // Dosyaları temizle
    setFileEn(null); // Dosyaları temizle
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      // 1. FormData objesi oluştur
      const formData = new FormData();

      // 2. Tüm metin alanlarını tek tek ekle
      formData.append("Id", selectedUser.id);
      formData.append("Name", selectedUser.name || "");
      formData.append("Age", selectedUser.age || 0);
      formData.append("Description1", selectedUser.description1 || "");
      formData.append("Description2", selectedUser.description2 || "");
      formData.append("TechStack", selectedUser.techStack || "");
      formData.append("UniversityName", selectedUser.universityName || "");
      formData.append("Email", selectedUser.email || "");
      formData.append("PhoneNumber", selectedUser.phoneNumber || "");
      formData.append("GithubLink", selectedUser.githubLink || "");
      formData.append("LinkednLink", selectedUser.linkednLink || "");
      formData.append("WPLink", selectedUser.wpLink || "");

      // 3. Mevcut DB dosya yollarını gönder (Yeni dosya seçilmezse korunmaları için)
      formData.append("CvPathTR", selectedUser.cvPathTR || "");
      formData.append("CvPathEN", selectedUser.cvPathEN || "");

      // 4. EĞER kullanıcı yeni bir dosya seçtiyse, dosya objelerini ekle
      // Backend DTO: CvFileTr ve CvFileEn isimleriyle eşleşmeli
      if (fileTr) formData.append("CvFileTr", fileTr);
      if (fileEn) formData.append("CvFileEn", fileEn);

      await dispatch(fetchUpdateUser(formData));
      handleClose();
      dispatch(fetchUsers()); // Veriyi tekrar çekip listeyi yenile
    }
  };

  if (status === "pendingFetchUsers" && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
        <CircularProgress sx={{ color: 'rgb(241, 113, 8)' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: '1600px', mx: 'auto' }}>
      <Typography variant="h3" align="center" sx={{ mb: 6, mt: 6, fontWeight: 'bold', color: 'rgb(241, 113, 8)', fontSize: { xs: '2rem', md: '3rem' } }}>
        Tüm Kullanıcı Detayları
      </Typography>

      {error && <Typography color="error" align="center" sx={{ mb: 4 }}>{error}</Typography>}

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} lg={6} key={user.id}>
            <Card sx={{
              display: 'flex', flexDirection: 'column', boxShadow: 6, borderRadius: 3,
              border: '2px solid rgb(71, 71, 107)', position: 'relative'
            }}>
              {/* ÜST BAŞLIK (Tasarım aynı) */}
              <Box sx={{ bgcolor: 'rgb(71, 71, 107)', p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'rgb(241, 113, 8)', width: 60, height: 60 }}>{user.name?.charAt(0)}</Avatar>
                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', textAlign: { xs: 'center', md: 'left' } }}>{user.name}</Typography>
              </Box>

              <CardContent>
                <Grid container spacing={2}>
                  {/* SOL SÜTUN */}
                  <Grid item xs={12} sm={6}>
                    <List dense>
                      <InfoRow label="E-POSTA" value={user.email} />
                      <InfoRow label="TELEFON" value={user.phoneNumber} />
                      <InfoRow label="YAŞ" value={user.age} />
                      <InfoRow label="ÜNİVERSİTE" value={user.universityName} />
                      {/* Statik yol gösterimi devam edebilir, istersen kaldırabilirsin */}
                      <InfoRow label="TR CV YOLU" value={user.cvPathTR} />
                    </List>
                  </Grid>

                  {/* SAĞ SÜTUN */}
                  <Grid item xs={12} sm={6}>
                    <List dense>
                      <InfoRow label="GITHUB" value={user.githubLink} />
                      <InfoRow label="LINKEDIN" value={user.linkednLink} />
                      <InfoRow label="WHATSAPP" value={user.wpLink} />
                      <InfoRow label="EN CV YOLU" value={user.cvPathEN} />
                    </List>
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Divider sx={{ my: 1, borderColor: 'rgb(241, 113, 8)' }} />
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'rgb(241, 113, 8)', display: 'block' }}>AÇIKLAMA 1</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{user.description1}</Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'rgb(241, 113, 8)', display: 'block' }}>AÇIKLAMA 2</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{user.description2}</Typography>

                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'rgb(241, 113, 8)', display: 'block' }}>TECH STACK</Typography>
                    <Typography variant="body2">{user.techStack}</Typography>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions sx={{ p: 2, bgcolor: '#f9f9f9', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Button
                  variant="contained"
                  onClick={() => handleEditClick(user)}
                  sx={{ bgcolor: 'rgb(241, 113, 8)', '&:hover': { bgcolor: 'rgb(200, 90, 5)' }, fontWeight: 'bold', width: { xs: '100%', md: 'auto' } }}
                >
                  BÜTÜN VERİLERİ DÜZENLE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* GÜNCELLEME MODALI (Önceki tasarım korundu, CV kısmı güncellendi) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'rgb(241, 113, 8)', color: '#fff', textAlign: 'center' }}>
          {selectedUser?.name} Verilerini Güncelle
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Grid container spacing={2} sx={{ mt: 1, justifyContent: 'center' }}>
              <Grid item xs={12} md={6}>
                <TextField label="İsim" fullWidth value={selectedUser.name || ""} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}   />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="E-posta" fullWidth value={selectedUser.email || ""} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Telefon" fullWidth value={selectedUser.phoneNumber || ""} onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}  />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Üniversite" fullWidth value={selectedUser.universityName || ""} onChange={(e) => setSelectedUser({ ...selectedUser, universityName: e.target.value })}  />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Yaş" type="number" fullWidth value={selectedUser.age || ""} onChange={(e) => setSelectedUser({ ...selectedUser, age: parseInt(e.target.value) || 0 })}  />
              </Grid>

              {/* CV YÜKLEME ALANLARI (Yeni eklendi, tasarım turuncu tema ile uyumlu) */}
              <Grid item xs={12} md={6}>
                <InputFileButton 
                  label="TÜRKÇE CV (PDF)" 
                  onChange={(e) => setFileTr(e.target.files[0])} 
                  fileName={fileTr?.name} 
                />
                 {selectedUser.cvPathTR && <Typography variant="caption" color="textSecondary" display="block" align="center">Mevcut: {selectedUser.cvPathTR}</Typography>}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputFileButton 
                  label="İNGİLİZCE CV (PDF)" 
                  onChange={(e) => setFileEn(e.target.files[0])} 
                  fileName={fileEn?.name} 
                />
                {selectedUser.cvPathEN && <Typography variant="caption" color="textSecondary" display="block" align="center">Mevcut: {selectedUser.cvPathEN}</Typography>}
              </Grid>

              <Grid item xs={12} md={4}><TextField label="GitHub Link" fullWidth value={selectedUser.githubLink || ""} onChange={(e) => setSelectedUser({ ...selectedUser, githubLink: e.target.value })}    /></Grid>
              <Grid item xs={12} md={4}><TextField label="Linkedin Link" fullWidth value={selectedUser.linkednLink || ""} onChange={(e) => setSelectedUser({ ...selectedUser, linkednLink: e.target.value })}  /></Grid>
              <Grid item xs={12} md={4}><TextField label="WhatsApp Link" fullWidth value={selectedUser.wpLink || ""} onChange={(e) => setSelectedUser({ ...selectedUser, wpLink: e.target.value })}  /></Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'rgb(71, 71, 107)', mt: 2, textAlign: 'center' }}>
                  DETAYLI AÇIKLAMA 1 (HAKKINDA / ÖZET)
                </Typography>
                <TextField
                  multiline rows={6} fullWidth value={selectedUser.description1 || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, description1: e.target.value })}
                  sx={{ bgcolor: '#fcfcfc', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgb(241, 113, 8)' } }, textAlign: 'center' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'rgb(71, 71, 107)', mt: 2, textAlign: 'center' }}>
                  DETAYLI AÇIKLAMA 2 (EK BİLGİLER / NOTLAR)
                </Typography>
                <TextField
                  multiline rows={6} fullWidth value={selectedUser.description2 || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, description2: e.target.value })}
                  
                  sx={{ bgcolor: '#fcfcfc', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgb(241, 113, 8)' } } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'rgb(71, 71, 107)', mt: 2, textAlign: 'center' }}>
                  TECH STACK
                </Typography>
                <TextField
                  multiline rows={6} fullWidth value={selectedUser.techStack || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, techStack: e.target.value })}
                  
                  sx={{ bgcolor: '#fcfcfc', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgb(241, 113, 8)' } } }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="error" sx={{ width: { xs: '45%', md: 'auto' } }}>Vazgeç</Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{ bgcolor: 'rgb(71, 71, 107)', width: { xs: '45%', md: 'auto' }, '&:hover': { bgcolor: 'rgb(50, 50, 80)' } }}
          >
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserAdminPanel;