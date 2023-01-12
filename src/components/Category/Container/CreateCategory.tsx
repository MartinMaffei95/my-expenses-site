import { MouseEvent, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import InputField from '../../Forms&Fields/Pure/InputField';

//FORMIK
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { Category, PostCategory } from '../../../Interfaces/Category.interface';
import SelectIcon from '../../SelectIcon/Pure/SelectIcon';
import { CustomIcon } from '../../SelectIcon/Molecule/CustomIcon';
import { saveCategory } from '../../../services/Category.services';
import { useModal } from '../../../hooks/useModal';
import { useReloadData } from '../../../hooks/useReloadData';
type CreateCategoryProps = {
  isSubcategory?: boolean;
};

export const CreateCategory = ({
  isSubcategory = false,
}: CreateCategoryProps) => {
  const [subcategories, setSubcategories] = useState<PostCategory[]>([]);
  const { handleModal } = useModal();
  const reloadData = useReloadData();

  const subCategrySubmit = () => {
    if (
      subcategories.find(
        (subCategory) => subCategory.name === subCategoryFormik.values.name
      )
    ) {
      return alert('ya xiste');
    }
    setSubcategories((prevState) => [...prevState, subCategoryFormik.values]);
    subCategoryFormik.resetForm();
  };

  const initialValues = {
    name: '',
    icon: '',
    sub_category: null,
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    icon: yup.string(),
  });

  const user_id = JSON.parse(localStorage.getItem('user_id') as string);

  const onSubmit = async (): Promise<void> => {
    if (subcategories !== null && subcategories.length > 0) {
      try {
        const category = {
          name: values.name,
          icon: values.icon,
          sub_category: subcategories,
        };
        await saveCategory(category as PostCategory, user_id);
        handleModal(false, '');
        reloadData();
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('Unexpected error', err);
        }
      }
    } else {
      try {
        await saveCategory(values, user_id);
        handleModal(false, '');
        reloadData();
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('Unexpected error', err);
        }
      }
    }
  };

  // ** OPTIONAL ** Create a sub category

  const subCategoryFormik = useFormik<PostCategory>({
    onSubmit: subCategrySubmit,
    initialValues: initialValues,
    validationSchema: validationSchema,
  });

  const removeSubcategoryCard = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    let scList = subcategories.filter((sc) => sc.name !== id);
    setSubcategories(scList);
  };

  // Create Category
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setFieldValue,
  }: FormikProps<PostCategory> = useFormik<PostCategory>({
    onSubmit,
    initialValues,
    validationSchema,
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="subtitle">Crear una categoria</h3>
      <form id="category-form" onSubmit={handleSubmit}>
        <InputField
          label="Nombre de la categoria"
          inputName="name"
          labelClassname="label-style"
          inputClassname={'input-style'}
          value={values.name}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errorMessage={touched.name && errors.name ? errors.name : null}
        />

        <SelectIcon
          setFieldValue={setFieldValue}
          name={'icon'}
          value={values.icon || ''}
        />
      </form>
      {!isSubcategory ? (
        <div className="flex flex-col gap-2">
          <h3 className="subtitle">Subcategorias creadas</h3>

          {subcategories && subcategories.length > 0
            ? subcategories.map((sc) => (
                <div
                  key={sc.name}
                  className="flex shadow-md justify-center items-center"
                >
                  <span>{sc.name}</span>
                  <span className="text-2xl p-2 ">
                    <CustomIcon iconName={sc.icon || ''} />
                  </span>
                  <button
                    id={sc.name}
                    onClick={(e) => removeSubcategoryCard(e)}
                  >
                    ELIMINAR
                  </button>
                </div>
              ))
            : null}
          <div>
            <h3 className="subtitle">Crear subcategorias</h3>
          </div>
          <Accordion>
            <AccordionSummary expandIcon={'▼'}>
              <span>Mi nueva subcategoria</span>
            </AccordionSummary>
            <AccordionDetails>
              <InputField
                label="Nombre de la sub-categoria"
                inputName="name"
                labelClassname="label-style"
                inputClassname={'input-style'}
                value={subCategoryFormik.values.name}
                handleBlur={subCategoryFormik.handleBlur}
                handleChange={subCategoryFormik.handleChange}
                errorMessage={
                  subCategoryFormik.touched.name &&
                  subCategoryFormik.errors.name
                    ? subCategoryFormik.errors.name
                    : null
                }
              />
              <SelectIcon
                setFieldValue={subCategoryFormik.setFieldValue}
                name={'icon'}
                value={subCategoryFormik?.values?.icon || ''}
              />
              <button
                className="btn-input font-bold text-lg mt-2 mb-2"
                onClick={subCategrySubmit}
              >
                Agregar sub categoria
              </button>
            </AccordionDetails>
          </Accordion>
        </div>
      ) : null}

      <button
        form="category-form"
        className="btn-input font-bold text-lg mt-2 mb-2"
        type="submit"
      >
        Guardar
      </button>
    </div>
  );
};
