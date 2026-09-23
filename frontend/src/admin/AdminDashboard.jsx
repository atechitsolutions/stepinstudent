import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/projects';

const emptyProject = {
  title: '',
  category: '',
  description: '',
  imageUrl: '',
  projectUrl: '',
  technologies: '',
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);

  // =====================================================
  // IMAGE STATE
  // =====================================================

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // =====================================================
  // GENERAL STATE
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');
  const username = localStorage.getItem('adminUsername');

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =====================================================
  // LOAD PROJECTS
  // =====================================================

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(API_URL);

      console.log('PROJECTS FROM SERVER:', response.data);

      setProjects(response.data);
    } catch (err) {
      console.error('LOAD PROJECTS ERROR:', err);

      setError(
        err.response?.data?.message ||
          'Unable to load projects.'
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadProjects();
  }, []);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE VALIDATION
  // =====================================================

  const processImageFile = (file) => {
    if (!file) {
      return;
    }

    console.log('SELECTED IMAGE:', file);

    // Check image type
    if (!file.type.startsWith('image/')) {
      setError(
        'Please select a valid image file.'
      );
      return;
    }

    // Maximum 10 MB
    if (file.size > 10 * 1024 * 1024) {
      setError(
        'Image size must be less than 10 MB.'
      );
      return;
    }

    setError('');

    setSelectedImage(file);

    // Create browser preview
    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    console.log(
      'IMAGE READY FOR UPLOAD:',
      file.name
    );
  };

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    processImageFile(file);
  };

  // =====================================================
  // IMAGE DROP
  // =====================================================

  const handleImageDrop = (e) => {
    e.preventDefault();

    const file =
      e.dataTransfer.files?.[0];

    processImageFile(file);
  };

  // =====================================================
  // IMAGE DRAG OVER
  // =====================================================

  const handleDragOver = (e) => {
    e.preventDefault();

    e.currentTarget.style.borderColor =
      '#a83b8c';

    e.currentTarget.style.background =
      '#fcf3fa';
  };

  // =====================================================
  // IMAGE DRAG LEAVE
  // =====================================================

  const handleDragLeave = (e) => {
    e.currentTarget.style.borderColor =
      '#d8ceda';

    e.currentTarget.style.background =
      '#faf8fb';
  };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const uploadImage = async (projectId) => {
    if (!selectedImage) {
      console.log(
        'NO IMAGE SELECTED - SKIPPING UPLOAD'
      );

      return null;
    }

    if (!projectId) {
      throw new Error(
        'Project ID is missing. Cannot upload image.'
      );
    }

    console.log(
      '===================================='
    );

    console.log(
      'STARTING IMAGE UPLOAD'
    );

    console.log(
      'Project ID:',
      projectId
    );

    console.log(
      'Image name:',
      selectedImage.name
    );

    console.log(
      'Image type:',
      selectedImage.type
    );

    console.log(
      'Image size:',
      selectedImage.size
    );

    console.log(
      '===================================='
    );

    const formData = new FormData();

    formData.append(
      'image',
      selectedImage
    );

    try {
      const response = await axios.post(
        `${API_URL}/${projectId}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        '===================================='
      );

      console.log(
        'IMAGE UPLOAD SUCCESS'
      );

      console.log(
        'SERVER RESPONSE:',
        response.data
      );

      console.log(
        'IMAGE URL:',
        response.data?.imageUrl
      );

      console.log(
        '===================================='
      );

      return response.data;

    } catch (err) {
      console.error(
        '===================================='
      );

      console.error(
        'IMAGE UPLOAD FAILED'
      );

      console.error(
        'STATUS:',
        err.response?.status
      );

      console.error(
        'SERVER RESPONSE:',
        err.response?.data
      );

      console.error(
        'ERROR:',
        err
      );

      console.error(
        '===================================='
      );

      throw err;
    }
  };

  // =====================================================
  // ADD / UPDATE PROJECT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    try {
      setSaving(true);
      setError('');

      console.log(
        '===================================='
      );

      console.log(
        'PROJECT SUBMISSION STARTED'
      );

      console.log(
        'Selected image:',
        selectedImage
      );

      console.log(
        'Form:',
        form
      );

      console.log(
        '===================================='
      );

      let savedProject;

      // =================================================
      // UPDATE EXISTING PROJECT
      // =================================================

      if (editingId) {
        console.log(
          'UPDATING PROJECT:',
          editingId
        );

        const response = await axios.put(
          `${API_URL}/${editingId}`,
          form,
          authConfig
        );

        savedProject = response.data;

        console.log(
          'PROJECT UPDATED:',
          savedProject
        );
      }

      // =================================================
      // CREATE NEW PROJECT
      // =================================================

      else {
        console.log(
          'CREATING NEW PROJECT'
        );

        const response = await axios.post(
          API_URL,
          form,
          authConfig
        );

        savedProject = response.data;

        console.log(
          'PROJECT CREATED:',
          savedProject
        );
      }

      // =================================================
      // IMPORTANT:
      // UPLOAD IMAGE AFTER PROJECT HAS ID
      // =================================================

      if (selectedImage) {
        if (!savedProject?.id) {
          throw new Error(
            'Project was saved but no project ID was returned.'
          );
        }

        const imageProject =
          await uploadImage(
            savedProject.id
          );

        // Use the latest project returned
        // from image upload
        if (imageProject) {
          savedProject =
            imageProject;
        }

        console.log(
          'PROJECT AFTER IMAGE UPLOAD:',
          savedProject
        );
      }

      // =================================================
      // RESET FORM
      // =================================================

      setForm(emptyProject);

      setSelectedImage(null);

      setImagePreview('');

      setEditingId(null);

      // Reset file input
      const fileInput =
        document.getElementById(
          'project-image-input'
        );

      if (fileInput) {
        fileInput.value = '';
      }

      // =================================================
      // RELOAD PROJECTS FROM DATABASE
      // =================================================

      await loadProjects();

      console.log(
        'PROJECT LIST RELOADED'
      );

      console.log(
        'PROJECT SUBMISSION COMPLETED'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    } catch (err) {
      console.error(
        '===================================='
      );

      console.error(
        'PROJECT SAVE ERROR'
      );

      console.error(
        'STATUS:',
        err.response?.status
      );

      console.error(
        'SERVER RESPONSE:',
        err.response?.data
      );

      console.error(
        'ERROR:',
        err
      );

      console.error(
        '===================================='
      );

      // =================================================
      // UNAUTHORIZED
      // =================================================

      if (err.response?.status === 401) {
        logout();
        return;
      }

      // =================================================
      // FORBIDDEN
      // =================================================

      if (err.response?.status === 403) {
        setError(
          'You are not authorized to modify projects.'
        );

        return;
      }

      // =================================================
      // IMAGE UPLOAD ERROR
      // =================================================

      if (
        err.config?.url?.includes('/image')
      ) {
        setError(
          err.response?.data?.message ||
            'Project was saved, but the image upload failed.'
        );

        return;
      }

      // =================================================
      // GENERAL ERROR
      // =================================================

      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to save project.'
      );

    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // EDIT PROJECT
  // =====================================================

  const handleEdit = (project) => {
    console.log(
      'EDIT PROJECT:',
      project
    );

    setEditingId(project.id);

    setForm({
      title: project.title || '',
      category: project.category || '',
      description:
        project.description || '',
      imageUrl:
        project.imageUrl || '',
      projectUrl:
        project.projectUrl || '',
      technologies:
        project.technologies || '',
    });

    // New image has not been selected
    setSelectedImage(null);

    // Show existing database image
    if (project.imageUrl) {
      setImagePreview(
        getImageUrl(
          project.imageUrl
        )
      );
    } else {
      setImagePreview('');
    }

    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =====================================================
  // DELETE PROJECT
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this project?'
      );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      await axios.delete(
        `${API_URL}/${id}`,
        authConfig
      );

      await loadProjects();

    } catch (err) {
      console.error(
        'DELETE PROJECT ERROR:',
        err
      );

      if (
        err.response?.status === 401
      ) {
        logout();
        return;
      }

      if (
        err.response?.status === 403
      ) {
        setError(
          'You are not authorized to delete projects.'
        );

        return;
      }

      setError(
        err.response?.data?.message ||
          'Unable to delete project.'
      );
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const cancelEdit = () => {
    setEditingId(null);

    setForm(emptyProject);

    setSelectedImage(null);

    setImagePreview('');

    setError('');

    const fileInput =
      document.getElementById(
        'project-image-input'
      );

    if (fileInput) {
      fileInput.value = '';
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem(
      'adminToken'
    );

    localStorage.removeItem(
      'adminUsername'
    );

    localStorage.removeItem(
      'adminRole'
    );

    navigate('/admin/login');
  };

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return '';
    }

    // Already complete URL
    if (
      imageUrl.startsWith(
        'http://'
      ) ||
      imageUrl.startsWith(
        'https://'
      ) ||
      imageUrl.startsWith(
        'data:'
      ) ||
      imageUrl.startsWith(
        'blob:'
      )
    ) {
      return imageUrl;
    }

    // Spring Boot upload path
    if (
      imageUrl.startsWith('/')
    ) {
      return `http://localhost:8080${imageUrl}`;
    }

    return `http://localhost:8080/${imageUrl}`;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div style={styles.page}>

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <header style={styles.header}>

        <div style={styles.brandBlock}>

          <div style={styles.logo}>
            A-TECH
          </div>

          <div>
            <h1 style={styles.heading}>
              Admin Dashboard
            </h1>

            <p style={styles.welcome}>
              Welcome, {username || 'Admin'}
            </p>
          </div>

        </div>

        <div style={styles.headerActions}>

          <button
            type="button"
            onClick={() =>
              navigate('/')
            }
            style={styles.websiteButton}
          >
            View Website ↗
          </button>

          <button
            type="button"
            onClick={logout}
            style={styles.logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main style={styles.container}>

        {/* =================================================
            PAGE INTRO
        ================================================= */}

        <div style={styles.pageIntro}>

          <div>

            <div style={styles.eyebrow}>
              A-TECH ADMIN
            </div>

            <h2 style={styles.pageTitle}>
              Manage Your Projects.
            </h2>

            <p style={styles.pageDescription}>
              Add, edit and manage the projects
              displayed across your A-Tech portfolio.
            </p>

          </div>

          <div style={styles.projectCounter}>

            <strong
              style={
                styles.projectCounterStrong
              }
            >
              {projects.length}
            </strong>

            <span>
              {projects.length === 1
                ? 'Project'
                : 'Projects'}
            </span>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div style={styles.error}>
            <span>!</span>
            {error}
          </div>
        )}


        {/* =================================================
            PROJECT FORM
        ================================================= */}

        <section style={styles.formCard}>

          <div style={styles.sectionHeader}>

            <div>

              <div
                style={
                  styles.sectionEyebrow
                }
              >
                PROJECT MANAGEMENT
              </div>

              <h2 style={styles.sectionTitle}>
                {editingId
                  ? 'Edit Project'
                  : 'Add New Project'}
              </h2>

              <p
                style={
                  styles.sectionDescription
                }
              >
                {editingId
                  ? 'Update the selected project details.'
                  : 'Add a new project to your A-Tech portfolio.'}
              </p>

            </div>

            {editingId && (
              <div
                style={
                  styles.editBadge
                }
              >
                EDITING PROJECT
              </div>
            )}

          </div>


          <form onSubmit={handleSubmit}>

            <div style={styles.grid}>

              {/* =================================================
                  TITLE
              ================================================= */}

              <div>

                <label style={styles.label}>
                  Project Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="A-Tech Website"
                  required
                  style={styles.input}
                />

              </div>


              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div>

                <label style={styles.label}>
                  Category
                </label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Web Development"
                  required
                  style={styles.input}
                />

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div style={styles.fullWidth}>

                <label style={styles.label}>
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the project..."
                  rows="5"
                  required
                  style={styles.textarea}
                />

              </div>


              {/* =================================================
                  PROJECT IMAGE
              ================================================= */}

              <div style={styles.fullWidth}>

                <label style={styles.label}>
                  Project Image
                </label>

                <div
                  style={{
                    ...styles.dropZone,
                    ...(imagePreview
                      ? styles.dropZoneWithImage
                      : {}),
                  }}

                  onDragOver={handleDragOver}

                  onDragLeave={handleDragLeave}

                  onDrop={(e) => {
                    e.preventDefault();

                    e.currentTarget.style.borderColor =
                      '#d8ceda';

                    e.currentTarget.style.background =
                      '#faf8fb';

                    handleImageDrop(e);
                  }}

                  onClick={() =>
                    document
                      .getElementById(
                        'project-image-input'
                      )
                      ?.click()
                  }
                >

                  <input
                    id="project-image-input"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    style={{
                      display: 'none',
                    }}
                  />

                  {imagePreview ? (

                    <div
                      style={
                        styles.imagePreviewContainer
                      }
                    >

                      <img
                        src={imagePreview}
                        alt="Project preview"
                        style={
                          styles.imagePreview
                        }
                      />

                      <div
                        style={
                          styles.imagePreviewOverlay
                        }
                      >
                        Click to change image
                      </div>

                    </div>

                  ) : (

                    <div
                      style={
                        styles.uploadContent
                      }
                    >

                      <div
                        style={
                          styles.uploadIcon
                        }
                      >
                        ↑
                      </div>

                      <strong
                        style={
                          styles.uploadTitle
                        }
                      >
                        Drag & drop your project image
                      </strong>

                      <span
                        style={
                          styles.uploadText
                        }
                      >
                        or click to choose from your computer
                      </span>

                      <small
                        style={
                          styles.uploadHelper
                        }
                      >
                        PNG, JPG, JPEG, WEBP • Maximum 10 MB
                      </small>

                    </div>

                  )}

                </div>

              </div>


              {/* =================================================
                  PROJECT URL
              ================================================= */}

              <div>

                <label style={styles.label}>
                  Project URL
                </label>

                <input
                  name="projectUrl"
                  value={form.projectUrl}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  style={styles.input}
                />

              </div>


              {/* =================================================
                  TECHNOLOGIES
              ================================================= */}

              <div>

                <label style={styles.label}>
                  Technologies / Tags
                </label>

                <input
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="React, Java, Spring Boot, MySQL"
                  style={styles.input}
                />

                <small style={styles.helper}>
                  Separate technologies with commas.
                </small>

              </div>

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div style={styles.actions}>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={saving}
                style={{
                  ...styles.saveButton,
                  opacity: saving
                    ? 0.65
                    : 1,
                  cursor: saving
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Update Project'
                    : 'Add Project'}
              </button>

            </div>

          </form>

        </section>


        {/* =================================================
            PROJECT LIST
        ================================================= */}

        <section style={styles.listSection}>

          <div style={styles.listHeader}>

            <div>

              <div
                style={
                  styles.sectionEyebrow
                }
              >
                PORTFOLIO
              </div>

              <h2 style={styles.sectionTitle}>
                Projects
              </h2>

              <p
                style={
                  styles.sectionDescription
                }
              >
                Projects currently stored in your database.
              </p>

            </div>

            <div style={styles.countBadge}>
              {projects.length}{' '}
              {projects.length === 1
                ? 'Project'
                : 'Projects'}
            </div>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div style={styles.message}>

              <div style={styles.loader}>
                Loading
              </div>

              <p>
                Loading projects...
              </p>

            </div>

          ) : projects.length === 0 ? (

            <div
              style={
                styles.emptyState
              }
            >

              <div
                style={
                  styles.emptyIcon
                }
              >
                +
              </div>

              <h3>
                No Projects Yet
              </h3>

              <p>
                Add your first project using the form above.
              </p>

            </div>

          ) : (

            <div
              style={
                styles.projectGrid
              }
            >

              {projects.map(
                (project) => (

                  <article
                    key={project.id}
                    style={
                      styles.projectCard
                    }
                  >

                    {/* =========================================
                        IMAGE
                    ========================================= */}

                    <div
                      style={
                        styles.imageWrapper
                      }
                    >

                      {project.imageUrl ? (

                        <img
                          src={getImageUrl(
                            project.imageUrl
                          )}
                          alt={
                            project.title
                          }
                          style={
                            styles.projectImage
                          }

                          onLoad={() => {
                            console.log(
                              'PROJECT IMAGE LOADED:',
                              project.imageUrl
                            );
                          }}

                          onError={(e) => {
                            console.error(
                              'PROJECT IMAGE FAILED TO LOAD:',
                              project.imageUrl
                            );

                            console.error(
                              'FULL IMAGE URL:',
                              getImageUrl(
                                project.imageUrl
                              )
                            );

                            e.currentTarget.style.display =
                              'none';

                            if (
                              e.currentTarget
                                .nextSibling
                            ) {
                              e.currentTarget
                                .nextSibling
                                .style.display =
                                'flex';
                            }
                          }}
                        />

                      ) : null}


                      <div
                        style={{
                          ...styles.imagePlaceholder,

                          display:
                            project.imageUrl
                              ? 'none'
                              : 'flex',
                        }}
                      >
                        NO IMAGE
                      </div>


                      <div
                        style={
                          styles.projectNumber
                        }
                      >
                        #{project.id}
                      </div>

                    </div>


                    {/* =========================================
                        CONTENT
                    ========================================= */}

                    <div
                      style={
                        styles.projectContent
                      }
                    >

                      <small
                        style={
                          styles.category
                        }
                      >
                        {project.category}
                      </small>


                      <h3
                        style={
                          styles.projectTitle
                        }
                      >
                        {project.title}
                      </h3>


                      <p
                        style={
                          styles.description
                        }
                      >
                        {project.description}
                      </p>


                      {/* =========================================
                          TECHNOLOGIES
                      ========================================= */}

                      {project.technologies && (

                        <div
                          style={
                            styles.tags
                          }
                        >

                          {project.technologies
                            .split(',')
                            .map(
                              (
                                technology,
                                index
                              ) => (

                                <span
                                  key={`${technology}-${index}`}
                                  style={
                                    styles.tag
                                  }
                                >
                                  {technology.trim()}
                                </span>

                              )
                            )}

                        </div>

                      )}


                      {/* =========================================
                          PROJECT URL
                      ========================================= */}

                      {project.projectUrl && (

                        <a
                          href={
                            project.projectUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          style={
                            styles.projectLink
                          }
                        >
                          View Project ↗
                        </a>

                      )}


                      {/* =========================================
                          ACTIONS
                      ========================================= */}

                      <div
                        style={
                          styles.cardActions
                        }
                      >

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              project
                            )
                          }
                          style={
                            styles.editButton
                          }
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              project.id
                            )
                          }
                          style={
                            styles.deleteButton
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   A-TECH ADMIN STYLES
========================================================= */

const styles = {

  /* =====================================================
     PAGE
  ===================================================== */

  page: {
    minHeight: '100vh',

    background:
      'radial-gradient(circle at 85% 10%, rgba(235, 90, 183, 0.25), transparent 28%), linear-gradient(135deg, #17091f 0%, #281033 42%, #4b164b 72%, #24102f 100%)',

    paddingBottom: '80px',

    color: '#ffffff',
  },


  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    maxWidth: '1400px',

    margin: '0 auto',

    padding: '28px 40px',

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',

    borderBottom:
      '1px solid rgba(255,255,255,0.10)',

    boxSizing: 'border-box',
  },


  brandBlock: {
    display: 'flex',

    alignItems: 'center',

    gap: '18px',
  },


  logo: {
    fontSize: '20px',

    fontWeight: '800',

    letterSpacing: '-0.04em',

    color: '#ffffff',
  },


  heading: {
    margin: 0,

    fontSize: '25px',

    fontWeight: '600',

    color: '#ffffff',

    letterSpacing: '-0.03em',
  },


  welcome: {
    margin: '4px 0 0',

    color: '#d9bfdc',

    fontSize: '14px',
  },


  headerActions: {
    display: 'flex',

    alignItems: 'center',

    gap: '12px',
  },


  websiteButton: {
    border:
      '1px solid rgba(255,255,255,0.25)',

    borderRadius: '30px',

    padding: '12px 20px',

    background:
      'rgba(255,255,255,0.08)',

    color: '#ffffff',

    cursor: 'pointer',

    fontSize: '14px',

    fontWeight: '500',
  },


  logout: {
    border: 'none',

    borderRadius: '30px',

    padding: '12px 22px',

    background:
      'linear-gradient(135deg, #ffffff, #f4dced)',

    color: '#211026',

    cursor: 'pointer',

    fontSize: '14px',

    fontWeight: '600',
  },


  /* =====================================================
     MAIN
  ===================================================== */

  container: {
    maxWidth: '1400px',

    margin: '0 auto',

    padding: '0 40px',

    boxSizing: 'border-box',
  },


  pageIntro: {
    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'flex-end',

    gap: '30px',

    padding: '65px 0 35px',
  },


  eyebrow: {
    display: 'inline-block',

    marginBottom: '12px',

    color: '#f29bdc',

    fontSize: '12px',

    fontWeight: '700',

    letterSpacing: '0.18em',
  },


  pageTitle: {
    margin: 0,

    fontSize: 'clamp(38px, 5vw, 62px)',

    lineHeight: 1,

    letterSpacing: '-0.055em',

    color: '#ffffff',

    maxWidth: '700px',
  },


  pageDescription: {
    margin: '18px 0 0',

    maxWidth: '620px',

    color: '#d6c3db',

    fontSize: '16px',

    lineHeight: 1.7,
  },


  projectCounter: {
    minWidth: '120px',

    padding: '20px',

    borderRadius: '18px',

    background:
      'rgba(255,255,255,0.08)',

    border:
      '1px solid rgba(255,255,255,0.12)',

    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center',
  },


  projectCounterStrong: {
    color: '#ffffff',

    fontSize: '30px',

    lineHeight: 1,

    marginBottom: '5px',
  },


  /* =====================================================
     ERROR
  ===================================================== */

  error: {
    display: 'flex',

    alignItems: 'center',

    gap: '10px',

    background:
      'rgba(255, 80, 100, 0.14)',

    border:
      '1px solid rgba(255, 120, 140, 0.25)',

    color: '#ffb7c0',

    padding: '14px 18px',

    borderRadius: '12px',

    marginBottom: '24px',
  },


  /* =====================================================
     CARDS
  ===================================================== */

  formCard: {
    background:
      'rgba(255,255,255,0.98)',

    borderRadius: '24px',

    padding: '38px',

    marginBottom: '30px',

    boxShadow:
      '0 25px 80px rgba(0,0,0,0.22)',

    color: '#171321',
  },


  listSection: {
    background:
      'rgba(255,255,255,0.98)',

    borderRadius: '24px',

    padding: '38px',

    boxShadow:
      '0 25px 80px rgba(0,0,0,0.22)',

    color: '#171321',
  },


  sectionHeader: {
    marginBottom: '28px',

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'flex-start',

    gap: '20px',
  },


  listHeader: {
    marginBottom: '28px',

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'flex-end',

    gap: '20px',
  },


  sectionEyebrow: {
    color: '#a83b8c',

    fontSize: '11px',

    fontWeight: '700',

    letterSpacing: '0.16em',

    marginBottom: '8px',
  },


  sectionTitle: {
    margin: 0,

    fontSize: '28px',

    color: '#171321',

    letterSpacing: '-0.035em',
  },


  sectionDescription: {
    margin: '7px 0 0',

    color: '#777080',

    fontSize: '14px',
  },


  editBadge: {
    padding: '8px 12px',

    borderRadius: '20px',

    background: '#f8e4f4',

    color: '#9d3a83',

    fontSize: '11px',

    fontWeight: '700',

    letterSpacing: '0.08em',
  },


  countBadge: {
    padding: '10px 15px',

    borderRadius: '20px',

    background: '#f5e5f2',

    color: '#94377d',

    fontSize: '13px',

    fontWeight: '600',
  },


  /* =====================================================
     FORM
  ===================================================== */

  grid: {
    display: 'grid',

    gridTemplateColumns:
      'repeat(2, minmax(0, 1fr))',

    gap: '22px',
  },


  fullWidth: {
    gridColumn: '1 / -1',
  },


  label: {
    display: 'block',

    marginBottom: '8px',

    fontWeight: '600',

    color: '#302a38',

    fontSize: '14px',
  },


  input: {
    width: '100%',

    boxSizing: 'border-box',

    padding: '14px 16px',

    border:
      '1px solid #ddd5df',

    borderRadius: '11px',

    fontSize: '14px',

    color: '#201b27',

    background: '#ffffff',

    outline: 'none',
  },


  textarea: {
    width: '100%',

    boxSizing: 'border-box',

    padding: '14px 16px',

    border:
      '1px solid #ddd5df',

    borderRadius: '11px',

    fontSize: '14px',

    color: '#201b27',

    background: '#ffffff',

    resize: 'vertical',

    outline: 'none',

    fontFamily: 'inherit',

    lineHeight: 1.6,
  },


  helper: {
    display: 'block',

    marginTop: '7px',

    color: '#938b98',

    fontSize: '12px',
  },


  /* =====================================================
     IMAGE DROP ZONE
  ===================================================== */

  dropZone: {
    width: '100%',

    minHeight: '230px',

    boxSizing: 'border-box',

    border:
      '2px dashed #d8ceda',

    borderRadius: '16px',

    background: '#faf8fb',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    cursor: 'pointer',

    transition:
      'border-color 0.2s ease, background 0.2s ease',

    overflow: 'hidden',
  },


  dropZoneWithImage: {
    padding: 0,
  },


  uploadContent: {
    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center',

    justifyContent: 'center',

    textAlign: 'center',

    padding: '35px',
  },


  uploadIcon: {
    width: '52px',

    height: '52px',

    marginBottom: '15px',

    borderRadius: '50%',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    background: '#f5e5f2',

    color: '#963b80',

    fontSize: '26px',

    fontWeight: '700',
  },


  uploadTitle: {
    color: '#302a38',

    fontSize: '17px',

    fontWeight: '600',
  },


  uploadText: {
    marginTop: '7px',

    color: '#817888',

    fontSize: '14px',
  },


  uploadHelper: {
    marginTop: '12px',

    color: '#aaa1ad',

    fontSize: '12px',
  },


  imagePreviewContainer: {
    position: 'relative',

    width: '100%',

    height: '280px',
  },


  imagePreview: {
    width: '100%',

    height: '100%',

    objectFit: 'cover',

    display: 'block',
  },


  imagePreviewOverlay: {
    position: 'absolute',

    left: 0,

    right: 0,

    bottom: 0,

    padding: '15px',

    textAlign: 'center',

    background:
      'linear-gradient(transparent, rgba(20,7,28,0.82))',

    color: '#ffffff',

    fontSize: '14px',

    fontWeight: '500',
  },


  /* =====================================================
     BUTTONS
  ===================================================== */

  actions: {
    display: 'flex',

    justifyContent: 'flex-end',

    gap: '10px',

    marginTop: '28px',
  },


  saveButton: {
    border: 'none',

    borderRadius: '30px',

    padding: '14px 25px',

    background:
      'linear-gradient(135deg, #171321, #4b164b)',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: '600',

    fontSize: '14px',
  },


  cancelButton: {
    border:
      '1px solid #d7ced9',

    borderRadius: '30px',

    padding: '14px 25px',

    background: '#ffffff',

    color: '#4b4250',

    cursor: 'pointer',

    fontSize: '14px',
  },


  /* =====================================================
     PROJECT GRID
  ===================================================== */

  projectGrid: {
    display: 'grid',

    gridTemplateColumns:
      'repeat(auto-fill, minmax(290px, 1fr))',

    gap: '24px',
  },


  projectCard: {
    border:
      '1px solid #e8e0e9',

    borderRadius: '18px',

    overflow: 'hidden',

    background: '#ffffff',

    transition:
      'transform 0.25s ease, box-shadow 0.25s ease',

    boxShadow:
      '0 8px 25px rgba(38,20,45,0.06)',
  },


  imageWrapper: {
    position: 'relative',

    height: '200px',

    background:
      'linear-gradient(135deg, #2b1037, #6b1d60)',

    overflow: 'hidden',
  },


  projectImage: {
    width: '100%',

    height: '100%',

    objectFit: 'cover',

    display: 'block',
  },


  imagePlaceholder: {
    width: '100%',

    height: '100%',

    alignItems: 'center',

    justifyContent: 'center',

    background:
      'linear-gradient(135deg, #281033, #661d5e)',

    color: '#dcb9d9',

    fontSize: '12px',

    letterSpacing: '0.15em',

    fontWeight: '700',
  },


  projectNumber: {
    position: 'absolute',

    top: '12px',

    right: '12px',

    padding: '6px 9px',

    borderRadius: '20px',

    background:
      'rgba(20,7,28,0.72)',

    color: '#ffffff',

    fontSize: '11px',

    backdropFilter: 'blur(8px)',
  },


  projectContent: {
    padding: '22px',
  },


  category: {
    color: '#a43b8c',

    textTransform: 'uppercase',

    letterSpacing: '0.1em',

    fontSize: '10px',

    fontWeight: '700',
  },


  projectTitle: {
    margin: '8px 0',

    fontSize: '21px',

    color: '#171321',

    letterSpacing: '-0.03em',
  },


  description: {
    color: '#706875',

    lineHeight: 1.6,

    fontSize: '13px',

    margin: '0 0 10px',
  },


  tags: {
    display: 'flex',

    flexWrap: 'wrap',

    gap: '6px',

    marginTop: '14px',
  },


  tag: {
    padding: '6px 9px',

    background: '#f6edf5',

    borderRadius: '7px',

    fontSize: '11px',

    color: '#6e3262',

    fontWeight: '500',
  },


  projectLink: {
    display: 'inline-block',

    marginTop: '15px',

    color: '#9b3b85',

    fontSize: '13px',

    fontWeight: '600',

    textDecoration: 'none',
  },


  cardActions: {
    display: 'flex',

    gap: '9px',

    marginTop: '20px',
  },


  editButton: {
    flex: 1,

    padding: '11px',

    border:
      '1px solid #d8ceda',

    borderRadius: '9px',

    background: '#ffffff',

    color: '#302734',

    cursor: 'pointer',

    fontWeight: '500',
  },


  deleteButton: {
    flex: 1,

    padding: '11px',

    border: 'none',

    borderRadius: '9px',

    background: '#1a1220',

    color: '#ffffff',

    cursor: 'pointer',

    fontWeight: '500',
  },


  /* =====================================================
     STATES
  ===================================================== */

  message: {
    padding: '70px 30px',

    textAlign: 'center',

    color: '#777080',
  },


  loader: {
    display: 'inline-block',

    padding: '7px 13px',

    borderRadius: '20px',

    background: '#f5e6f2',

    color: '#963b80',

    fontSize: '12px',

    fontWeight: '600',
  },


  emptyState: {
    padding: '70px 30px',

    textAlign: 'center',

    border:
      '1px dashed #d9cedb',

    borderRadius: '16px',

    color: '#777080',
  },


  emptyIcon: {
    width: '48px',

    height: '48px',

    margin: '0 auto 15px',

    display: 'flex',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: '50%',

    background: '#f5e5f2',

    color: '#9c3b84',

    fontSize: '25px',
  },
};