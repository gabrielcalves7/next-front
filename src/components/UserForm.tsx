
'use client';

import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from '@mui/material';
import {UserRole} from '@/types/auth.types';
import {getRoleName} from "@/utils/helpers";
import {User, UserFormData} from "@/types/user.types";

interface UserFormProps {
    initialData?: User;
    onSubmit: (data: UserFormData) => Promise<void>;
    loading: boolean;
    error: string | null;
    isEditMode?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({initialData, onSubmit, loading, error, isEditMode = false}) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [pixKey, setPixKey] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.Buyer);
    const [isActive, setIsActive] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.full_name || '');
            setUsername(initialData.username || '');
            setEmail(initialData.email || '');
            setPhone(initialData.phone || '');
            setCharacterName(initialData.character_name || '');
            setPixKey(initialData.pix_key || '');
            setRole(initialData.role || UserRole.Buyer);
            setIsActive(initialData.is_active ?? true);
            setVerified(initialData.verified ?? false);
            setPassword('');
        }
    }, [initialData]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data: UserFormData = {
            full_name: fullName,
            username: username,
            email: email,
            phone: phone,
            character_name: characterName,
            pix_key: pixKey,
            role: role,
            is_active: isActive,
            verified: verified,
        };
        if (password) {
            data.password = password;
        }
        await onSubmit(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}

            <TextField margin="normal" required fullWidth label="Nome Completo" name="full_name" value={fullName}
                       onChange={(e) => setFullName(e.target.value)} disabled={loading}/>
            <TextField margin="normal" required fullWidth label="Nome de Usuário" name="username" value={username}
                       onChange={(e) => setUsername(e.target.value)} disabled={loading || isEditMode}/>
            <TextField margin="normal" required fullWidth label="Email" name="email" type="email" value={email}
                       onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
            <TextField margin="normal" fullWidth label="Telefone" name="phone" value={phone}
                       onChange={(e) => setPhone(e.target.value)} disabled={loading}/>

            <TextField margin="normal" fullWidth label="Nome do Personagem (opcional)" name="character_name"
                       value={characterName} onChange={(e) => setCharacterName(e.target.value)} disabled={loading}/>
            <TextField margin="normal" fullWidth label="Chave PIX (opcional)" name="pix_key" value={pixKey}
                       onChange={(e) => setPixKey(e.target.value)} disabled={loading}/>

            <TextField margin="normal" fullWidth
                       label={isEditMode ? "Nova Senha (deixe em branco para não alterar)" : "Senha"} name="password"
                       type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}
                       autoComplete="new-password"/>

            <FormControl fullWidth margin="normal">
                <InputLabel id="role-select-label">Tipo de Usuário *</InputLabel>
                <Select labelId="role-select-label" value={role} label="Tipo de Usuário *"
                        onChange={(e) => setRole(e.target.value as UserRole)} disabled={loading}>
                    {
                        Object
                            .values(UserRole)
                            .filter(v => typeof v === 'number')
                            .map(
                                r => <MenuItem
                                    key={r}
                                    value={r}
                                >
                                    {getRoleName(r as UserRole)}
                                </MenuItem>
                            )
                    }
                </Select>
            </FormControl>

            <Box sx={{display: 'flex', justifyContent: 'space-around', mt: 2, mb: 2}}>
                <FormControlLabel
                    control={<Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} name="is_active"
                                     disabled={loading}/>} label="Usuário Ativo"/>
                <FormControlLabel
                    control={<Switch checked={verified} onChange={(e) => setVerified(e.target.checked)} name="verified"
                                     disabled={loading}/>} label="Usuário Verificado"/>
            </Box>

            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2, py: 1.5}} disabled={loading}>
                {loading ? <CircularProgress size={24}/> : (isEditMode ? 'Salvar Alterações' : 'Criar Usuário')}
            </Button>
        </Box>
    );
};

export default UserForm;