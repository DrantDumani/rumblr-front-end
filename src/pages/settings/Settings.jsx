import anon from '../../assets/icons/incognito.svg';
import defHeader from '../../assets/images/default_header.png';
import styles from './Settings.module.css';
import { useState, useId } from 'react';
import Edit from '../../assets/icons/edit.svg?react';
import PropTypes from 'prop-types';
import { handleData } from '../../utils/handleData';
import { useLoaderData, useNavigate } from 'react-router';

function InputFileLabel({ labelText, changeMedia }) {
  const id = useId();
  return (
    <>
      <label className={styles.fileInputLabel} htmlFor={id}>
        <Edit aria-label="hidden" />
        <span className={styles.fileSpan}>{labelText}</span>
      </label>
      <input
        className={styles.fileInput}
        id={id}
        type="file"
        accept="image/*"
        onChange={changeMedia}
      />
    </>
  );
}

InputFileLabel.propTypes = {
  labelText: PropTypes.string,
  changeMedia: PropTypes.func,
};

export function Settings() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState(useLoaderData());
  const [canEdit, setCanEdit] = useState(false);
  const [newPfp, setNewPfp] = useState(null);
  const [newHeader, setNewHeader] = useState(null);
  const [aboutText, setAboutText] = useState(useLoaderData().about);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const limit = 2097152;
  const fileLimitExceeded =
    (newPfp && newPfp.file.size > limit) ||
    (newHeader && newHeader.file.size > limit);

  const toggleEdit = () => setCanEdit((t) => !t);

  const cancelEdits = () => {
    toggleEdit();
    newHeader && URL.revokeObjectURL(newHeader.src);
    newPfp && URL.revokeObjectURL(newPfp.src);
    setNewHeader(null);
    setNewPfp(null);
  };

  const toggleMedia = (file, setterFn) => {
    const src = URL.createObjectURL(file);
    setterFn({ file, src });
  };

  const changeAbout = (e) => {
    setAboutText(e.target.value);
  };

  const saveChanges = async () => {
    const canSubmit =
      (aboutText !== userInfo.about || newHeader || newPfp) &&
      !fileLimitExceeded;
    if (!canSubmit) return;

    setSubmitting(true);
    const input = new FormData();
    if (newPfp) input.append('pfp', newPfp.file);
    if (newHeader) input.append('header', newHeader.file);
    input.append('about', aboutText);

    const resp = await handleData('users', input, 'PUT', 'multipart/form-data');
    if (resp.ok) {
      const newInfo = await resp.json();
      localStorage.setItem('token', newInfo.newToken);
      setUserInfo({
        uname: newInfo.uname,
        pfp: newInfo.pfp,
        h_img: newInfo.h_img,
        about: newInfo.about,
      });

      setCanEdit(false);
      setNewHeader(null);
      setNewPfp(null);
      setAboutText(newInfo.about);
      setSubmitting(false);
    } else {
      // handle error by making a pop up appear
      // enable editing for user again
    }
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settings}>
        <div className={styles.settings__imgWrapper}>
          <img
            className={styles.settings__headerImg}
            src={newHeader ? newHeader.src : userInfo.h_img || defHeader}
            alt=""
          />
          {canEdit && (
            <div className={styles.settings__headerImgInput_wrapper}>
              <InputFileLabel
                labelText={'Edit Header Image'}
                changeMedia={(e) => {
                  toggleMedia(e.target.files[0], setNewHeader);
                }}
              />
            </div>
          )}
          {fileLimitExceeded && (
            <p className={styles.settings__warning}>
              Images cannot individually exceed 2mb in file size
            </p>
          )}
        </div>
        <div className={styles.settings__btnWrapper}>
          <button
            disabled={submitting}
            onClick={canEdit ? cancelEdits : logout}
            className={`${styles.settings__btn} ${styles['settings__btn--logout']}`}
          >
            {canEdit ? 'Cancel' : 'Logout'}
          </button>
          <button
            disabled={(canEdit && aboutText === userInfo.about) || submitting}
            onClick={canEdit ? saveChanges : toggleEdit}
            className={`${styles.settings__btn} `}
          >
            {canEdit ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className={styles.settings__pfpWrapper}>
          <img
            className={styles.settings__pfp}
            src={newPfp ? newPfp.src : userInfo.pfp || anon}
            alt=""
          />
          {canEdit && (
            <div className={styles.settings__pfpInputWrapper}>
              <InputFileLabel
                labelText={'Edit profile picture'}
                changeMedia={(e) => {
                  toggleMedia(e.target.files[0], setNewPfp);
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.settings__textWrapper}>
          <h2 className={styles.settings__uname}>{userInfo.uname}</h2>
          {!canEdit && (
            <pre className={styles.settings__about}>{userInfo.about}</pre>
          )}
          {canEdit && (
            <textarea
              className={styles.settings__aboutInput}
              maxLength={400}
              value={aboutText}
              onChange={changeAbout}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
}
